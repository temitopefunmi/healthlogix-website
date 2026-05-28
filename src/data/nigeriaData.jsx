// nigeriaData.js
const nigeriaData = {
  "Abia": { "Aba North": [] },
  "Adamawa": { "Yola North": [] },
  "Akwa Ibom": { "Uyo": [] },
  "Anambra": { "Awka South": [] },
  "Bauchi": { "Bauchi": [] },
  "Bayelsa": { "Yenagoa": [] },
  "Benue": { "Makurdi": [] },
  "Borno": { "Maiduguri": [] },
  "Cross River": { "Calabar South": [] },
  "Delta": { "Warri South": [] },
  "Ebonyi": { "Abakaliki": [] },
  "Edo": { "Benin City": [] },
  "Ekiti": { "Ado Ekiti": [] },
  "Enugu": {
    "Enugu North": [
      {
        name: "Enugu Specialist Clinic",
        beds: 20,
        icu: 5,
        lab: true,
        drugs: ["Aspirin", "Amoxicillin"],
        type: "Private",
        lat: 6.4523,
        lng: 7.5240
      }
    ]
  },
  "Gombe": { "Gombe": [] },
  "Imo": { "Owerri Municipal": [] },
  "Jigawa": { "Dutse": [] },
  "Kaduna": {
    "Kaduna North": [
      {
        name: "Kaduna General Hospital",
        beds: 35,
        icu: 7,
        lab: true,
        drugs: ["Paracetamol", "Metformin"],
        type: "State",
        lat: 10.5105,
        lng: 7.4165
      }
    ],
    "Zaria": []
  },
  "Kano": { "Nassarawa": [] },
  "Katsina": { "Katsina": [] },
  "Kebbi": { "Birnin Kebbi": [] },
  "Kogi": { "Lokoja": [] },
  "Kwara": { "Ilorin West": [] },
  "Lagos": {
    "Ikeja": [
      {
        name: "Lagos State University Teaching Hospital",
        beds: 60,
        icu: 15,
        lab: true,
        drugs: ["Insulin", "Panadol"],
        type: "Teaching",
        lat: 6.5244,
        lng: 3.3792
      }
    ],
    "Surulere": []
  },
  "Nasarawa": { "Lafia": [] },
  "Niger": { "Minna": [] },
  "Ogun": { "Abeokuta North": [] },
  "Ondo": { "Akure": [
    {
      name: "Ondo State Specialist Hospital",
      beds: 30,
      icu: 6,
      lab: true,
      drugs: ["Amoxicillin", "Paracetamol"],
      type: "State",
      lat: 7.2500,
      lng: 5.2000
    },
    {
      name: "ETON medical center",
      beds: 7,
      icu: 1,
      lab: false,
      drugs: ["Ibuprofen"],
      type: "Private",
      lat: 7.2500,
      lng: 5.2100
    }
  ],
  "Ondo": [
    {
      name: "University of Medical Sciences Teaching Hospital",
      beds: 30,
      icu: 6,
      lab: true,
      drugs: ["Amoxicillin", "Paracetamol"],
      type: "Teaching",
      lat: 7.2500,
      lng: 5.2000
    }
  ]
 },
  "Osun": { "Osogbo": [] },
  "Oyo": {
    "Ibadan North": [
      {
        name: "University College Hospital Ibadan",
        beds: 50,
        icu: 10,
        lab: true,
        drugs: ["Amoxicillin", "Paracetamol"],
        type: "Teaching",
        lat: 7.4458,
        lng: 3.9000
      }
    ],
    "Oyo East": []
  },
  "Plateau": { "Jos North": [] },
    "Rivers": {
    "Port Harcourt": [
      {
        name: "Rivers State Specialist Hospital",
        beds: 40,
        icu: 8,
        lab: true,
        drugs: ["Paracetamol", "Ceftriaxone"],
        type: "State",
        lat: 4.8156,
        lng: 7.0498
      },
      {
        name: "Harbour Private Clinic",
        beds: 25,
        icu: 5,
        lab: false,
        drugs: ["Ibuprofen"],
        type: "Private",
        lat: 4.8183,
        lng: 7.0421
      }
    ]
  },
  "Sokoto": { "Sokoto": [] },
  "Taraba": { "Jalingo": [] },
  "Yobe": { "Damaturu": [] },
  "Zamfara": { "Gusau": [] },

  "FCT": {
    "Abuja Municipal": [
      {
        name: "National Hospital Abuja",
        beds: 0,
        icu: 12,
        lab: true,
        drugs: ["Paracetamol", "Artemether"],
        type: "Federal",
        lat: 9.0579,
        lng: 7.4951
      }
    ],
    "Bwari": []
  },
};

export default nigeriaData;