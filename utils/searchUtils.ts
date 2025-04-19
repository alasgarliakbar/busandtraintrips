// Mock routes data
const routesData = [
  {
    id: '1',
    from: 'Paris',
    to: 'Amsterdam',
    departureTime: '08:25',
    arrivalTime: '11:45',
    date: '05/15/2025',
    price: 39,
    provider: 'TGV',
    type: 'train',
    duration: '3h 20m',
    transfers: 0,
  },
  {
    id: '2',
    from: 'Paris',
    to: 'Amsterdam',
    departureTime: '06:15',
    arrivalTime: '10:52',
    date: '05/16/2025',
    price: 45,
    provider: 'FlixBus',
    type: 'bus',
    duration: '4h 37m',
    transfers: 0,
  },
  {
    id: '3',
    from: 'Paris',
    to: 'Amsterdam',
    departureTime: '18:40',
    arrivalTime: '22:15',
    date: '05/17/2025',
    price: 35,
    provider: 'SNCF',
    type: 'train',
    duration: '3h 35m',
    transfers: 1,
    limitedSeats: true,
  },
  {
    id: '4',
    from: 'Berlin',
    to: 'Prague',
    departureTime: '09:30',
    arrivalTime: '14:45',
    date: '05/18/2025',
    price: 29,
    provider: 'Deutsche Bahn',
    type: 'train',
    duration: '5h 15m',
    transfers: 1,
  },
  {
    id: '5',
    from: 'Berlin',
    to: 'Prague',
    departureTime: '07:00',
    arrivalTime: '11:30',
    date: '05/19/2025',
    price: 19,
    provider: 'FlixBus',
    type: 'bus',
    duration: '4h 30m',
    transfers: 0,
    discount: true,
  },
  {
    id: '6',
    from: 'Rome',
    to: 'Florence',
    departureTime: '08:15',
    arrivalTime: '09:55',
    date: '05/20/2025',
    price: 19,
    provider: 'Trenitalia',
    type: 'train',
    duration: '1h 40m',
    transfers: 0,
  },
  {
    id: '7',
    from: 'Rome',
    to: 'Florence',
    departureTime: '14:30',
    arrivalTime: '16:15',
    date: '05/21/2025',
    price: 23,
    provider: 'Italo',
    type: 'train',
    duration: '1h 45m',
    transfers: 0,
  },
  {
    id: '8',
    from: 'Barcelona',
    to: 'Madrid',
    departureTime: '07:00',
    arrivalTime: '09:45',
    date: '05/22/2025',
    price: 24,
    provider: 'Renfe',
    type: 'train',
    duration: '2h 45m',
    transfers: 0,
  },
  {
    id: '9',
    from: 'Barcelona',
    to: 'Madrid',
    departureTime: '10:15',
    arrivalTime: '15:30',
    date: '05/23/2025',
    price: 18,
    provider: 'ALSA',
    type: 'bus',
    duration: '5h 15m',
    transfers: 0,
    discount: true,
  },
  {
    id: '10',
    from: 'Amsterdam',
    to: 'Brussels',
    departureTime: '08:52',
    arrivalTime: '10:32',
    date: '05/24/2025',
    price: 32,
    provider: 'NS International',
    type: 'train',
    duration: '1h 40m',
    transfers: 0,
  }
];

export function searchRoutes(
  origin: string,
  destination: string,
  dateRange: { startDate: string | null; endDate: string | null },
  transportMode: string
) {
  // Filter routes based on origin and destination
  let results = routesData.filter(
    route => route.from.toLowerCase().includes(origin.toLowerCase()) && 
             route.to.toLowerCase().includes(destination.toLowerCase())
  );
  
  // Filter based on transport mode
  if (transportMode !== 'all') {
    results = results.filter(route => route.type === transportMode);
  }
  
  // Sort by price (lowest first)
  results.sort((a, b) => a.price - b.price);
  
  return results;
}