export interface Car {
    autoriaURL?: string;
    battery?: string | number;
    color: string;
    complectation: string;
    dateOfFirstRegistration?: string | Date;
    description?: string;
    driveType: number;
    fuel: number;
    hp: number;
    id: number;
    images: String[];
    inUkraine: boolean;
    interiorColor?: string;
    location: string;
    mark: string;
    mileageRange: number;
    model: string;
    odometr: number;
    priceOnSale: number;
    slug: string;
    transmission: number;
    type: number;
    videoUrl?: string;
    volume: number;
    year: number;
  }
  