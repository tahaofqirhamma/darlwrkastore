export interface Translation {
  // Header
  storeName: string;
  storeSubtitle: string;

  // Hero section
  productTitle: string;
  productSubtitle: string;
  sizeBig: string;
  sizeSmall: string;
  priceBig: string;
  priceSmall: string;
  newBadge: string;
  description: string;
  features: {
    natural: string;
    premium: string;
    fast: string;
  };
  orderNow: string;
  trustedBy: string;

  // Form
  formTitle: string;
  nameLabel: string;
  namePlaceholder: string;
  phoneLabel: string;
  addressLabel: string;
  addressPlaceholder: string;
  sizeLabel: string;
  quantityLabel: string;
  deliveryLabel: string;
  pickupOption: string;
  deliveryOption: string;
  zoneLabel: string;
  zoneSelect: string;
  rabatZone: string;
  outsideZone: string;
  totalLabel: string;
  submitButton: string;
  quantityOptions: string[];
  dateLabel: string;
  timeLabel: string;

  // Footer
  footerDescription: string;
  contactTitle: string;
  location: string;
  phone: string;
  email: string;
  hours: string;
  copyright: string;
  terms: string;
  privacy: string;

  // Messages
  orderSuccess: string;
  currency: string;
}

export type Language = "ar" | "fr";
export type Size = "big" | "small";
