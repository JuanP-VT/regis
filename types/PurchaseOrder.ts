interface PurchaseUnit {
  referenceID: string; //File name
  value: string; //Price
}
export interface PurchaseOrder {
  id: string; //ID assigned by Paypal
  userID: string; // ID of the user in the DB
  createTime: string; //ISO 8601 timestamp
  payer: {
    name: {
      givenName: string;
      surname: string;
    };
    email: string;
    address: {
      countryCode: string;
    };
  };
  purchaseUnits: PurchaseUnit[];
}
