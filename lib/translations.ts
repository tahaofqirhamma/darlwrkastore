import type { Translation } from "./types";

export const translations: Record<"ar" | "fr", Translation> = {
  ar: {
    // Header
    storeName: "دار الورقة",
    storeSubtitle: "Dar Lwrka",

    // Hero section
    productTitle: "ورق البسطيلة على البخار",
    productSubtitle: "Feuilles de Bastilla à la vapeur",
    sizeBig: "كبيرة",
    sizeSmall: "صغيرة",
    priceBig: "30.00 MAD/kg",
    priceSmall: "35.00 MAD/kg",
    newBadge: "جديد",
    description:
      "ورق البسطيلة التقليدي المصنوع يدوياً بأفضل المكونات الطبيعية. مثالي لتحضير البسطيلة المنزلية اللذيذة.",
    features: {
      natural: "100% طبيعي",
      premium: "مكونات ممتازة",
      fast: "توصيل سريع",
    },
    orderNow: "اطلب الآن",
    trustedBy: "يثق بنا",

    // Form
    formTitle: "اطلب ورق البسطيلة",
    nameLabel: "الاسم الكامل",
    namePlaceholder: "اسمك الكامل",
    phoneLabel: "رقم الهاتف",
    addressLabel: "عنوان التوصيل",
    addressPlaceholder: "عنوانك الكامل",
    sizeLabel: "الحجم",
    quantityLabel: "الكمية (كيلو)",
    deliveryLabel: "نوع التوصيل",
    pickupOption: "استلام من المحل - مجاني",
    deliveryOption: "توصيل للمنزل",
    zoneLabel: "منطقة التوصيل",
    zoneSelect: "اختر المنطقة",
    rabatZone: "داخل الرباط - 20.00 درهم",
    outsideZone: "خارج الرباط - 25.00 درهم",
    totalLabel: "المبلغ الإجمالي",
    submitButton: "تأكيد الطلب",
    quantityOptions: ["1 كيلو", "2 كيلو", "3 كيلو", "5 كيلو", "10 كيلو"],
    dateLabel: "تاريخ التوصيل",
    timeLabel: "وقت التوصيل",
    timeSlotLabel: "وقت التسليم",
    timeSlotMorning: "صباحاً (08:00 - 12:00)",
    timeSlotAfternoon: "بعد الظهر (12:00 - 16:00)",
    timeSlotEvening: "مساءً (16:00 - 18:00)",

    // Footer
    footerDescription:
      "ورق البسطيلة التقليدي المصنوع يدوياً بأفضل المكونات الطبيعية",
    contactTitle: "تواصل معنا",
    location: "الرباط، شارع الازدهار امل 4,",
    phone: "+212 5XX XXX XXX",
    email: "contact@darlwrka.ma",
    hours: "الاثنين-السبت: 8ص-8م",
    copyright: "جميع الحقوق محفوظة",
    terms: "الشروط",
    privacy: "الخصوصية",

    // Messages
    orderSuccess: "شكراً لك! تم إرسال طلبك بنجاح.",
    currency: "درهم",
  },
  fr: {
    // Header
    storeName: "Dar Lwrka",
    storeSubtitle: "دار الورقة",

    // Hero section
    productTitle: "Feuilles de Bastilla à la vapeur",
    productSubtitle: "ورق البسطيلة على البخار",
    sizeBig: "Grand",
    sizeSmall: "Petit",
    priceBig: "30.00 MAD/kg",
    priceSmall: "35.00 MAD/kg",
    newBadge: "Nouveau",
    description:
      "Feuilles de bastilla traditionnelles fabriquées à la main avec les meilleurs ingrédients naturels. Parfaites pour préparer de délicieuses bastillas maison.",
    features: {
      natural: "100% Naturel",
      premium: "Ingrédients Premium",
      fast: "Livraison Rapide",
    },
    orderNow: "Commander Maintenant",
    trustedBy: "Ils nous font confiance",

    // Form
    formTitle: "Commander les Feuilles de Bastilla",
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom complet",
    phoneLabel: "Téléphone",
    addressLabel: "Adresse de livraison",
    addressPlaceholder: "Votre adresse complète",
    sizeLabel: "Taille",
    quantityLabel: "Quantité (kg)",
    deliveryLabel: "Type de livraison",
    pickupOption: "Retrait en magasin - Gratuit",
    deliveryOption: "Livraison à domicile",
    zoneLabel: "Zone de livraison",
    zoneSelect: "Choisir la zone",
    rabatZone: "Dans Rabat - 20.00 MAD",
    outsideZone: "Hors Rabat - 25.00 MAD",
    totalLabel: "Coût total",
    submitButton: "Confirmer la Commande",
    quantityOptions: ["1 kg", "2 kg", "3 kg", "5 kg", "10 kg"],
    dateLabel: "Date de livraison",
    timeLabel: "Heure de livraison",
    timeSlotLabel: "Horaire de livraison",
    timeSlotMorning: "Matin (08h00 - 12h00)",
    timeSlotAfternoon: "Après-midi (12h00 - 16h00)",
    timeSlotEvening: "Soir (16h00 - 18h00)",

    // Footer
    footerDescription:
      "Feuilles de bastilla traditionnelles fabriquées à la main avec les meilleurs ingrédients naturels",
    contactTitle: "Nous Contacter",
    location: "Rue Al Izdihar, Amal 4, Rabat",
    phone: "+212668102047",
    email: "",
    hours: "Lun-Sam: 8h-20h",
    copyright: "Tous droits réservés",
    terms: "Conditions",
    privacy: "Confidentialité",

    // Messages
    orderSuccess: "Merci ! Votre commande a été envoyée.",
    currency: "MAD",
  },
};
