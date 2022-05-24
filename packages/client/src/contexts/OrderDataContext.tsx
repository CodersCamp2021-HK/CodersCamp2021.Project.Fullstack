import { AddressDto, UserDto } from '@fullstack/sdk';
import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

type UserData = Omit<UserDto, 'id' | 'card'>;
type Address = Omit<AddressDto, 'id' | 'floor'>;

const OrderContext = createContext<{
  userDataContext: UserData | null;
  setUserDataContext: (data: UserData | null) => void;
  address: Address | null;
  setAddress: (address: Address | null) => void;
  addressId: string;
  setAddressId: (id: string) => void;
  deliveryHourStart: string;
  setDeliveryHourStart: (hourStart: string) => void;
}>({
  userDataContext: {},
  setUserDataContext: () => {},
  address: { street: '', streetNumber: '', city: '', postcode: '', apartmentNumber: '' },
  setAddress: () => {},
  addressId: '',
  setAddressId: () => {},
  deliveryHourStart: '',
  setDeliveryHourStart: () => {},
});

const OrderDataProvider = ({ children }: { children: ReactNode }) => {
  const [userDataContext, setUserDataContext] = useState<UserData | null>(null);
  const [address, setAddress] = useState<Address | null>(null);
  const [addressId, setAddressId] = useState<string>('');
  const [deliveryHourStart, setDeliveryHourStart] = useState<string>('');

  const value = useMemo(
    () => ({
      userDataContext,
      setUserDataContext,
      address,
      setAddress,
      addressId,
      setAddressId,
      deliveryHourStart,
      setDeliveryHourStart,
    }),
    [
      userDataContext,
      setUserDataContext,
      address,
      setAddress,
      addressId,
      setAddressId,
      deliveryHourStart,
      setDeliveryHourStart,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};

const useOrderDataContext = () => useContext(OrderContext);

export { OrderDataProvider, useOrderDataContext };
