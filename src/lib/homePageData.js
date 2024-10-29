const categories = [
    "Beach",
    "Forest",
    "City",
    "Lake",
    "Desert",
    "Island",
    "Countryside",
    "Historic",
    "Rainforest",
    "Cultural"
];

export const hotels = [
    {
        id: 1,
        title: 'Seaside Paradise',
        address: '123 Ocean Avenue',
        description: 'Relaxing beachside hotel with stunning ocean views.',
        category: categories[0],  // Beach
        country: 'USA',
        state: 'California',
        checkIn: '14:00',
        checkOut: '11:00',
        maxGuests: 4,
        price: 200,
        perks: ['ocean view', 'complimentary drinks', 'free parking'],
        photos: [
            'https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/210557/pexels-photo-210557.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 2,
        title: 'Mountain Retreat',
        address: '456 Hilltop Road',
        description: 'A serene retreat nestled in the mountains.',
        category: categories[1],  // Forest
        country: 'USA',
        state: 'Colorado',
        checkIn: '15:00',
        checkOut: '12:00',
        maxGuests: 6,
        price: 250,
        perks: ['mountain view', 'free breakfast', 'spa'],
        photos: [
            'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/53464/sheraton-palace-hotel-lobby-architecture-san-francisco-53464.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 3,
        title: 'Urban Oasis',
        address: '789 City Square',
        description: 'A modern hotel in the heart of the city.',
        category: categories[2],  // City
        country: 'USA',
        state: 'New York',
        checkIn: '13:00',
        checkOut: '11:00',
        maxGuests: 3,
        price: 180,
        perks: ['free Wi-Fi', 'gym access', '24-hour room service'],
        photos: [
            'https://images.pexels.com/photos/2029676/pexels-photo-2029676.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/2029676/pexels-photo-2029676.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 4,
        title: 'Lakeside Cabin',
        address: '101 Lakeview Lane',
        description: 'Charming cabin by the lake, perfect for a cozy getaway.',
        category: categories[3],  // Lake
        country: 'USA',
        state: 'Michigan',
        checkIn: '16:00',
        checkOut: '10:00',
        maxGuests: 2,
        price: 150,
        perks: ['lake view', 'fireplace', 'pet-friendly'],
        photos: [
            'https://images.pexels.com/photos/291682/pexels-photo-291682.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1171453/pexels-photo-1171453.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/2137802/pexels-photo-2137802.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 5,
        title: 'Desert Mirage',
        address: '303 Sandy Trail',
        description: 'Luxury retreat in the desert with stunning sunset views.',
        category: categories[4],  // Desert
        country: 'USA',
        state: 'Arizona',
        checkIn: '12:00',
        checkOut: '11:00',
        maxGuests: 5,
        price: 300,
        perks: ['desert tours', 'swimming pool', 'all-inclusive'],
        photos: [
            'https://images.pexels.com/photos/2132101/pexels-photo-2132101.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1118859/pexels-photo-1118859.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/247658/pexels-photo-247658.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 6,
        title: 'Island Bungalow',
        address: '650 Sunset Island',
        description: 'Private bungalow surrounded by clear waters and white sands.',
        category: categories[5],  // Island
        country: 'Bahamas',
        state: '',
        checkIn: '14:00',
        checkOut: '12:00',
        maxGuests: 4,
        price: 350,
        perks: ['beachfront', 'snorkeling gear', 'private deck'],
        photos: [
            'https://images.pexels.com/photos/1453773/pexels-photo-1453773.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/360912/pexels-photo-360912.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1535656/pexels-photo-1535656.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 7,
        title: 'Countryside Villa',
        address: '987 Country Road',
        description: 'Rustic villa surrounded by beautiful countryside landscapes.',
        category: categories[6],  // Countryside
        country: 'USA',
        state: 'Texas',
        checkIn: '13:00',
        checkOut: '11:00',
        maxGuests: 6,
        price: 280,
        perks: ['bike rental', 'farm-to-table dining', 'quiet atmosphere'],
        photos: [
            'https://images.pexels.com/photos/2437242/pexels-photo-2437242.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1393973/pexels-photo-1393973.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/2106079/pexels-photo-2106079.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 8,
        title: 'Historic Inn',
        address: '234 Old Town Road',
        description: 'Step back in time at this charming historic inn.',
        category: categories[7],  // Historic
        country: 'USA',
        state: 'Virginia',
        checkIn: '15:00',
        checkOut: '11:00',
        maxGuests: 3,
        price: 160,
        perks: ['guided tours', 'historical exhibits', 'free breakfast'],
        photos: [
            'https://images.pexels.com/photos/2391971/pexels-photo-2391971.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1055760/pexels-photo-1055760.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/3584613/pexels-photo-3584613.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 9,
        title: 'Rainforest Lodge',
        address: '555 Green Canopy Way',
        description: 'Experience nature at its finest in this beautiful rainforest lodge.',
        category: categories[8],  // Rainforest
        country: 'Costa Rica',
        state: '',
        checkIn: '14:00',
        checkOut: '10:00',
        maxGuests: 4,
        price: 180,
        perks: ['wildlife tours', 'organic meals', 'spa treatments'],
        photos: [
            'https://images.pexels.com/photos/1481677/pexels-photo-1481677.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1170972/pexels-photo-1170972.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/3408833/pexels-photo-3408833.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    },
    {
        id: 10,
        title: 'Cultural Hub',
        address: '888 Arts Street',
        description: 'Immerse yourself in the local culture at this vibrant hotel.',
        category: categories[9],  // Cultural
        country: 'Italy',
        state: 'Lazio',
        checkIn: '14:00',
        checkOut: '10:00',
        maxGuests: 5,
        price: 220,
        perks: ['art workshops', 'cooking classes', 'cultural tours'],
        photos: [
            'https://images.pexels.com/photos/1864717/pexels-photo-1864717.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/262597/pexels-photo-262597.jpeg?auto=compress&cs=tinysrgb&w=300',
            'https://images.pexels.com/photos/1711516/pexels-photo-1711516.jpeg?auto=compress&cs=tinysrgb&w=300'
        ]
    }
];
