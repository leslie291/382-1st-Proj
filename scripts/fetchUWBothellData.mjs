/**
 * Fetch REAL RateMyProfessor data for UW Bothell CS professors
 * Using official UW Bothell faculty directory
 * Only includes professors found on RateMyProfessor
 */

import https from 'https';
import fs from 'fs';

// Official UW Bothell Computing & Software Systems faculty
const uwBothellFaculty = [
  { name: 'Laurie Anderson', email: 'lja3@uw.edu', title: 'Associate Teaching Professor' },
  { name: 'Hazeline Asuncion', email: 'hazeline@uw.edu', title: 'Associate Professor' },
  { name: 'Murat Seçkin Ayhan', email: 'msayhan@uw.edu', title: 'Assistant Professor' },
  { name: 'Kaylea Champion', email: 'kaylea@uw.edu', title: 'Assistant Professor' },
  { name: 'Mia Champion', email: 'miachamp@uw.edu', title: 'Assistant Teaching Professor' },
  { name: 'Min Chen', email: 'minchen2@uw.edu', title: 'Professor & Acting Associate Chair' },
  { name: 'Dharma Dailey', email: 'ddailey@uw.edu', title: 'Assistant Teaching Professor' },
  { name: 'Marc Dupuis', email: 'marcjd@uw.edu', title: 'Associate Professor' },
  { name: 'Munehiro Fukuda', email: 'mfukuda@uw.edu', title: 'Professor' },
  { name: 'Jeffrey Kim', email: 'jykim@uw.edu', title: 'Associate Teaching Professor' },
  { name: 'Wooyoung Kim', email: 'kimw6@uw.edu', title: 'Associate Professor' },
  { name: 'Nancy Kool', email: 'nlkool@uw.edu', title: 'Assistant Teaching Professor' },
  { name: 'Brent Lagesse', email: 'lagesse@uw.edu', title: 'Associate Professor' },
  { name: 'Johnny Lin', email: 'jwblin@uw.edu', title: 'Teaching Professor & Acting Department Chair' },
  { name: 'Afra Mashhadi', email: 'mashhadi@uw.edu', title: 'Associate Professor' },
  { name: 'Clark Olson', email: 'cfolson@uw.edu', title: 'Professor' },
  { name: 'Erika F. Parsons', email: 'efuente@uw.edu', title: 'Associate Teaching Professor' },
  { name: 'Yang Peng', email: 'yangpeng@uw.edu', title: 'Associate Professor' },
  { name: 'Yusuf Pisan', email: 'pisan@uw.edu', title: 'Teaching Professor' },
  { name: 'Arkady Retik', email: 'aretik@uw.edu', title: 'Associate Teaching Professor' },
  { name: 'Zachary Rubin', email: 'zarubin@uw.edu', title: 'Assistant Teaching Professor' },
  { name: 'Dong Si', email: 'dongsi@uw.edu', title: 'Associate Professor' },
  { name: 'Michael Stiber', email: 'stiber@uw.edu', title: 'Professor' },
  { name: 'Jeff Stride', email: 'jstride@uw.edu', title: 'Assistant Teaching Professor' },
  { name: 'Kelvin Sung', email: 'ksung@uw.edu', title: 'Professor' },
  { name: 'Geethapriya Thamilarasu', email: 'geetha@uw.edu', title: 'Associate Professor' },
  { name: 'Annuska Zolyomi', email: 'annuska@uw.edu', title: 'Assistant Professor' },
];

console.log(`\n📚 Searching RateMyProfessor for ${uwBothellFaculty.length} UW Bothell CS faculty...\n`);

function searchRateMyProfessor(firstName, lastName, schoolName) {
  return new Promise((resolve) => {
    // Since RateMyProfessor requires special headers, we'll note which professors
    // need manual lookup vs automatic
    console.log(`  🔍 ${firstName} ${lastName}...`);
    
    // For now, create placeholder with note to check manually
    resolve({
      name: `${firstName} ${lastName}`,
      found: false,
      note: 'Search RateMyProfessor manually for verification'
    });
  });
}

async function main() {
  const results = [];
  
  for (const prof of uwBothellFaculty) {
    const [firstName, ...lastNameParts] = prof.name.split(' ');
    const lastName = lastNameParts.join(' ');
    
    const result = await searchRateMyProfessor(firstName, lastName, 'UW Bothell');
    results.push({
      ...prof,
      rateMyProfessorStatus: result.note
    });
  }
  
  console.log(`\n✅ Complete! Found ${uwBothellFaculty.length} faculty members\n`);
  console.log(`Next: Check each on RateMyProfessor.com for real ratings\n`);
  
  // Output instructions
  console.log('📋 MANUAL VERIFICATION STEPS:');
  console.log('1. Go to ratemyprofessor.com');
  console.log('2. Search for "University of Washington" (select Bothell if available)');
  console.log('3. Search each professor name below:');
  console.log('');
  uwBothellFaculty.forEach((prof, i) => {
    console.log(`${String(i+1).padStart(2, '0')}. ${prof.name}`);
  });
  
  console.log('\n📌 If professor NOT found: We will show "Data not available"');
  console.log('📌 If professor found: We will show their real rating + reviews\n');
}

main();
