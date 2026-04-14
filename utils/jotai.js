
import { atom } from "jotai";

export const userDataAtom = atom(null);

export const pickupDataAtom = atom(null);

export const deliveryDataAtom = atom(null);
export const isPickupAtom = atom(null);
export const isDeliveryAtom = atom(null);
export const deliveryAddressAtom = atom("");
export const pickupAddressAtom = atom("");
export const cordinatesAtom = atom({
  pickupLon:"",
  pickupLat:"",
  deliveryLon:"",
  deliveryLat:""

});


