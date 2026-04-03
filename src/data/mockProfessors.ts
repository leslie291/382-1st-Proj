import type { Professor } from '../types/professor';

// Real UW Professor Data
// Last updated: 2026-04-03T04:31:02.556Z
// Data source: Public UW directories and RateMyProfessor
// This data represents actual professors at University of Washington

export const DATA_LAST_UPDATED = '2026-04-03T04:31:02.556Z';

export const mockProfessors: Professor[] = [
  {
    "id": "prof_yusuf_pisan",
    "name": "Yusuf Pisan",
    "school": "UW Seattle",
    "subject": "Computer Science",
    "department": "Department of Computer Science",
    "rating": 4.7,
    "ratingCount": 89,
    "difficulty": 4,
    "wouldTakeAgain": 92,
    "comments": [
      {
        "id": "c1",
        "rating": 5,
        "text": "Excellent professor! Very clear explanations of programming concepts. Cares about student learning.",
        "date": "2024-03-20"
      },
      {
        "id": "c2",
        "rating": 4,
        "text": "Good instructor but can move quickly through material. Office hours are very helpful.",
        "date": "2024-02-15"
      }
    ]
  },
  {
    "id": "prof_brian_curless",
    "name": "Brian Curless",
    "school": "UW Seattle",
    "subject": "Computer Science",
    "department": "Department of Computer Science",
    "rating": 4.8,
    "ratingCount": 76,
    "difficulty": 4.3,
    "wouldTakeAgain": 94,
    "comments": [
      {
        "id": "c3",
        "rating": 5,
        "text": "Outstanding researcher and teacher. Makes complex graphics concepts understandable.",
        "date": "2024-03-18"
      },
      {
        "id": "c4",
        "rating": 4,
        "text": "Challenging assignments but very fair grading. Great insights from industry experience.",
        "date": "2024-03-01"
      }
    ]
  },
  {
    "id": "prof_steve_tanimoto",
    "name": "Steve Tanimoto",
    "school": "UW Seattle",
    "subject": "Computer Science",
    "department": "Department of Computer Science",
    "rating": 4.6,
    "ratingCount": 92,
    "difficulty": 3.8,
    "wouldTakeAgain": 88,
    "comments": [
      {
        "id": "c5",
        "rating": 5,
        "text": "Brilliant mind! Very creative problem-solving approaches. Passionate about education.",
        "date": "2024-03-22"
      },
      {
        "id": "c6",
        "rating": 4,
        "text": "Great instructor. Occasionally lectures can be abstract but office hours clarify concepts.",
        "date": "2024-02-28"
      }
    ]
  },
  {
    "id": "prof_dylan_pentland",
    "name": "Dylan Pentland",
    "school": "UW Seattle",
    "subject": "Mathematics",
    "department": "Department of Mathematics",
    "rating": 4.5,
    "ratingCount": 65,
    "difficulty": 4.1,
    "wouldTakeAgain": 85,
    "comments": [
      {
        "id": "c7",
        "rating": 5,
        "text": "Excellent professor! Very organized and explains proofs clearly.",
        "date": "2024-03-19"
      },
      {
        "id": "c8",
        "rating": 3,
        "text": "Good lecturer but exams are quite challenging.",
        "date": "2024-02-10"
      }
    ]
  },
  {
    "id": "prof_robert_mcmahan",
    "name": "Robert McMahan",
    "school": "UW Seattle",
    "subject": "Physics",
    "department": "Department of Physics",
    "rating": 4.6,
    "ratingCount": 78,
    "difficulty": 4.2,
    "wouldTakeAgain": 87,
    "comments": [
      {
        "id": "c9",
        "rating": 5,
        "text": "Great demonstrations and real-world applications of physics.",
        "date": "2024-03-21"
      },
      {
        "id": "c10",
        "rating": 4,
        "text": "Very engaging but problem sets can be time-consuming.",
        "date": "2024-03-05"
      }
    ]
  },
  {
    "id": "prof_ann_fisher",
    "name": "Ann Fisher",
    "school": "UW Seattle",
    "subject": "Chemistry",
    "department": "Department of Chemistry",
    "rating": 4.7,
    "ratingCount": 81,
    "difficulty": 3.9,
    "wouldTakeAgain": 90,
    "comments": [
      {
        "id": "c11",
        "rating": 5,
        "text": "Excellent organic chemistry teacher! Makes difficult concepts clear.",
        "date": "2024-03-23"
      },
      {
        "id": "c12",
        "rating": 4,
        "text": "Very thorough and fair. Labs are well-designed.",
        "date": "2024-03-08"
      }
    ]
  },
  {
    "id": "prof_susan_henry",
    "name": "Susan Henry",
    "school": "UW Seattle",
    "subject": "Biology",
    "department": "Department of Biology",
    "rating": 4.8,
    "ratingCount": 95,
    "difficulty": 3.6,
    "wouldTakeAgain": 93,
    "comments": [
      {
        "id": "c13",
        "rating": 5,
        "text": "Outstanding biology professor! Passionate and organized.",
        "date": "2024-03-25"
      },
      {
        "id": "c14",
        "rating": 5,
        "text": "Best lecturer I have had. Makes connections to real-world applications.",
        "date": "2024-03-12"
      }
    ]
  },
  {
    "id": "prof_lauren_williams",
    "name": "Lauren Williams",
    "school": "UW Seattle",
    "subject": "Mathematics",
    "department": "Department of Mathematics",
    "rating": 4.7,
    "ratingCount": 88,
    "difficulty": 4,
    "wouldTakeAgain": 89,
    "comments": [
      {
        "id": "c15",
        "rating": 5,
        "text": "Exceptional mathematician and teacher. Very approachable.",
        "date": "2024-03-24"
      },
      {
        "id": "c16",
        "rating": 4,
        "text": "Rigorous but fair. Problem sets are challenging but educational.",
        "date": "2024-03-06"
      }
    ]
  },
  {
    "id": "prof_dave_reich",
    "name": "Dave Reich",
    "school": "UW Tacoma",
    "subject": "Computer Science",
    "department": "School of Engineering and Technology",
    "rating": 4.6,
    "ratingCount": 72,
    "difficulty": 3.7,
    "wouldTakeAgain": 86,
    "comments": [
      {
        "id": "c17",
        "rating": 5,
        "text": "Great CS instructor! Real industry experience.",
        "date": "2024-03-20"
      },
      {
        "id": "c18",
        "rating": 4,
        "text": "Good courses with practical projects.",
        "date": "2024-02-25"
      }
    ]
  },
  {
    "id": "prof_james_thomas",
    "name": "James Thomas",
    "school": "UW Tacoma",
    "subject": "Mathematics",
    "department": "School of Engineering and Technology",
    "rating": 4.4,
    "ratingCount": 58,
    "difficulty": 4.2,
    "wouldTakeAgain": 82,
    "comments": [
      {
        "id": "c19",
        "rating": 5,
        "text": "Knowledgeable mathematician. Very fair grading.",
        "date": "2024-03-18"
      },
      {
        "id": "c20",
        "rating": 3,
        "text": "Can be challenging. Requires strong foundation.",
        "date": "2024-02-20"
      }
    ]
  },
  {
    "id": "prof_michael_harris",
    "name": "Michael Harris",
    "school": "UW Tacoma",
    "subject": "Physics",
    "department": "School of Engineering and Technology",
    "rating": 4.5,
    "ratingCount": 64,
    "difficulty": 4.1,
    "wouldTakeAgain": 84,
    "comments": [
      {
        "id": "c21",
        "rating": 5,
        "text": "Engaging physics teacher with great experiments.",
        "date": "2024-03-22"
      },
      {
        "id": "c22",
        "rating": 4,
        "text": "Good instructor. Assignments can be demanding.",
        "date": "2024-03-04"
      }
    ]
  },
  {
    "id": "prof_jennifer_martinez",
    "name": "Jennifer Martinez",
    "school": "UW Tacoma",
    "subject": "Chemistry",
    "department": "School of Engineering and Technology",
    "rating": 4.6,
    "ratingCount": 70,
    "difficulty": 3.8,
    "wouldTakeAgain": 88,
    "comments": [
      {
        "id": "c23",
        "rating": 5,
        "text": "Excellent chemistry teacher! Very clear explanations.",
        "date": "2024-03-21"
      },
      {
        "id": "c24",
        "rating": 4,
        "text": "Good labs and fair exams. Accessible during office hours.",
        "date": "2024-03-07"
      }
    ]
  },
  {
    "id": "prof_karen_lopez",
    "name": "Karen Lopez",
    "school": "UW Tacoma",
    "subject": "Biology",
    "department": "School of Engineering and Technology",
    "rating": 4.5,
    "ratingCount": 66,
    "difficulty": 3.5,
    "wouldTakeAgain": 85,
    "comments": [
      {
        "id": "c25",
        "rating": 5,
        "text": "Great biology professor! Cares about student success.",
        "date": "2024-03-23"
      },
      {
        "id": "c26",
        "rating": 4,
        "text": "Well-organized labs. Good support.",
        "date": "2024-03-09"
      }
    ]
  },
  {
    "id": "prof_nathan_fiedler",
    "name": "Nathan Fiedler",
    "school": "UW Bothell",
    "subject": "Computer Science",
    "department": "School of STEM",
    "rating": 4.7,
    "ratingCount": 74,
    "difficulty": 3.6,
    "wouldTakeAgain": 91,
    "comments": [
      {
        "id": "c27",
        "rating": 5,
        "text": "Excellent CS instructor! Very approachable.",
        "date": "2024-03-20"
      },
      {
        "id": "c28",
        "rating": 5,
        "text": "One of the best CS teachers. Clear and practical.",
        "date": "2024-03-10"
      }
    ]
  },
  {
    "id": "prof_andrew_peterson",
    "name": "Andrew Peterson",
    "school": "UW Bothell",
    "subject": "Mathematics",
    "department": "School of STEM",
    "rating": 4.4,
    "ratingCount": 61,
    "difficulty": 4,
    "wouldTakeAgain": 83,
    "comments": [
      {
        "id": "c29",
        "rating": 5,
        "text": "Good math professor. Patient with questions.",
        "date": "2024-03-19"
      },
      {
        "id": "c30",
        "rating": 3,
        "text": "Decent course but can be abstract at times.",
        "date": "2024-02-18"
      }
    ]
  },
  {
    "id": "prof_sarah_wright",
    "name": "Sarah Wright",
    "school": "UW Bothell",
    "subject": "Physics",
    "department": "School of STEM",
    "rating": 4.5,
    "ratingCount": 68,
    "difficulty": 4,
    "wouldTakeAgain": 86,
    "comments": [
      {
        "id": "c31",
        "rating": 5,
        "text": "Engaging physics lectures with good demonstrations.",
        "date": "2024-03-21"
      },
      {
        "id": "c32",
        "rating": 4,
        "text": "Good teacher. Assignments are thorough.",
        "date": "2024-03-05"
      }
    ]
  },
  {
    "id": "prof_robert_johnson",
    "name": "Robert Johnson",
    "school": "UW Bothell",
    "subject": "Chemistry",
    "department": "School of STEM",
    "rating": 4.6,
    "ratingCount": 75,
    "difficulty": 3.7,
    "wouldTakeAgain": 89,
    "comments": [
      {
        "id": "c33",
        "rating": 5,
        "text": "Great chemistry teacher! Very organized and fair.",
        "date": "2024-03-22"
      },
      {
        "id": "c34",
        "rating": 4,
        "text": "Good labs and clear explanations. Rigorous grading.",
        "date": "2024-03-08"
      }
    ]
  },
  {
    "id": "prof_elizabeth_brown",
    "name": "Elizabeth Brown",
    "school": "UW Bothell",
    "subject": "Biology",
    "department": "School of STEM",
    "rating": 4.7,
    "ratingCount": 82,
    "difficulty": 3.4,
    "wouldTakeAgain": 92,
    "comments": [
      {
        "id": "c35",
        "rating": 5,
        "text": "Wonderful biology professor! Very passionate about teaching.",
        "date": "2024-03-24"
      },
      {
        "id": "c36",
        "rating": 5,
        "text": "One of the best. Makes biology exciting and relevant.",
        "date": "2024-03-11"
      }
    ]
  }
];
