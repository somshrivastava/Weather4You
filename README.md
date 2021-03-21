npm run-script lint
npm run-script build
firebase serve --only functions

firebase target:apply hosting deve-weather deve-weather
firebase deploy --only hosting:deve-weather

{
  "hosting": {
    "target": "deve-weather",
    "public": "weather",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [ {
      "source": "**",
      "destination": "/index.html"
    } ],
    "headers": [
      {
        "source": "**/*.@(js|html)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-store, max-age=0"
          }
        ]
      }
    ]
  }
}

firebase target:apply hosting staging-weather staging-weather
firebase deploy --only hosting:staging-weather

{
  "hosting": {
    "target": "staging-weather",
    "public": "weather",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [ {
      "source": "**",
      "destination": "/index.html"
    } ],
    "headers": [
      {
        "source": "**/*.@(js|html)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-store, max-age=0"
          }
        ]
      }
    ]
  }
}

firebase target:apply hosting weather4you weather4you
firebase deploy --only hosting:weather4you

{
  "hosting": {
    "target": "weather4you",
    "public": "weather",
    "ignore": [
      "firebase.json",
      "**/.*",
      "**/node_modules/**"
    ],
    "rewrites": [ {
      "source": "**",
      "destination": "/index.html"
    } ],
    "headers": [
      {
        "source": "**/*.@(js|html)",
        "headers": [
          {
            "key": "Cache-Control",
            "value": "no-store, max-age=0"
          }
        ]
      }
    ]
  }
}

Deve Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if
          request.time < timestamp.date(2021, 1, 24);
    }
  }
}

Prod Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if false;
    }
  }
}