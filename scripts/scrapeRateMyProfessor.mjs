import https from 'https';

const schoolIds = {
  'UW Seattle': 1121,
  'UW Tacoma': 1119,
  'UW Bothell': 1118,
};

const query = `
query GetProfessors($schoolId: Int!, $count: Int = 50) {
  school(id: $schoolId) {
    name
    professors(first: $count) {
      edges {
        node {
          id
          firstName
          lastName
          avgRating
          numRatings
          department
          wouldTakeAgainPercent
        }
      }
    }
  }
}
`;

function fetchFromAPI(schoolId, schoolName) {
  return new Promise((resolve) => {
    const payload = JSON.stringify({
      query,
      variables: { schoolId, count: 50 }
    });

    const options = {
      hostname: 'www.ratemyprofessors.com',
      path: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length,
        'User-Agent': 'Mozilla/5.0'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          if (result.data?.school?.professors?.edges) {
            resolve({
              school: schoolName,
              professors: result.data.school.professors.edges.map(e => e.node)
            });
          } else {
            resolve({ school: schoolName, professors: [] });
          }
        } catch (e) {
          resolve({ school: schoolName, professors: [] });
        }
      });
    });

    req.on('error', () => resolve({ school: schoolName, professors: [] }));
    req.write(payload);
    req.end();
  });
}

async function scrapeAllSchools() {
  console.log('📚 Fetching real UW professor data from RateMyProfessor...\n');
  
  const allProfessors = [];
  
  for (const [schoolName, schoolId] of Object.entries(schoolIds)) {
    console.log(`  Scraping ${schoolName}...`);
    try {
      const result = await fetchFromAPI(schoolId, schoolName);
      const profs = result.professors.filter(p => p.avgRating > 0);
      
      console.log(`    ✓ Found ${profs.length} rated professors`);
      allProfessors.push(...profs.map(p => ({
        ...p,
        school: schoolName
      })));
    } catch (e) {
      console.log(`    ✗ Error`);
    }
  }

  return allProfessors;
}

async function main() {
  try {
    const professors = await scrapeAllSchools();
    console.log(`\n✅ Total professors: ${professors.length}`);
    
    if (professors.length > 0) {
      console.log('\nFirst 3 professors:');
      professors.slice(0, 3).forEach(p => {
        console.log(`  ${p.firstName} ${p.lastName} - ${p.school}: ${p.avgRating}⭐`);
      });
    }
  } catch (e) {
    console.error('Error:', e.message);
  }
}

main();
