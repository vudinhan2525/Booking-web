import { Button } from "@/components/ui/button";
import { IFlight } from "@/interfaces/IFlight";
import Dialog from "@/components/modals/Dialog";
import { formatNumber } from "@/utils/convertTime";
import React, { useEffect, useRef, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import ContactInfo from "./ContactInfo";
import { useAppContext } from "@/app/AppProvider";
import TicketType from "./TicketType";
import Overview from "./Overview";

export default function SheetSelectFlight({
  flight,
  iniNumberPassenger,
}: {
  flight: IFlight;
  iniNumberPassenger: string | null;
}) {
  const { user } = useAppContext();
  const [sltSeatType, setSltSeatType] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [numberPassenger, setNumberPassenger] = useState(() => {
    const string = iniNumberPassenger;
    if (string !== null) {
      const numberStringArr = string.split("-");
      for (let i = 0; i < numberStringArr.length; i++) {
        if (Number.isNaN(Number(numberStringArr[i]))) {
          return {
            adult: 1,
            child: 0,
            infant: 1,
          };
        }
      }
      if (Number(numberStringArr[0]) === 0) {
        return {
          adult: 1,
          child: 0,
          infant: 1,
        };
      }
      if (Number(numberStringArr[2]) > Number(numberStringArr[0])) {
        return {
          adult: Number(numberStringArr[0]),
          child: Number(numberStringArr[1]),
          infant: Number(numberStringArr[0]),
        };
      }
      return {
        adult: Number(numberStringArr[0]),
        child: Number(numberStringArr[1]),
        infant: Number(numberStringArr[2]),
      };
    }
    return {
      adult: 1,
      child: 0,
      infant: 1,
    };
  });
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (flight && !Number.isNaN(sltSeatType)) {
      setTotalPrice(
        flight.flightSeats[sltSeatType].price *
          (numberPassenger.adult + numberPassenger.child)
      );
    }
  }, [flight, sltSeatType, numberPassenger]);
  const [infoContact, setInfoContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [isCheckedInfo, setIsCheckedInfo] = useState(false);
  const [showErrorSavedInfo, setShowErrorSavedInfo] = useState(false);
  return (
    <div>
      {user ? (
        <div>
          <div>
            <Overview flight={flight} />
            <TicketType
              sltSeatType={sltSeatType}
              setSltSeatType={setSltSeatType}
              flight={flight}
            />
            <ContactInfo
              iniData={{
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
              }}
              setInfoContact={setInfoContact}
              setIsCheckedInfo={setIsCheckedInfo}
              showErrorSavedInfo={showErrorSavedInfo}
              setShowErrorSavedInfo={setShowErrorSavedInfo}
            />
            <div className="px-6 mt-4">
              <header className={` mt-4 text-lg font-bold`}>
                Passenger information
              </header>
            </div>
            <div className="sticky items-center px-6 py-1 justify-between bottom-0 flex border-t-[1px]  w-full bg-white">
              <div className="mt-2">
                <p className="text-gray-600 text-sm">{`Total for ${
                  numberPassenger.adult + numberPassenger.child
                } passenger(s) | ${numberPassenger.infant} infant(s)`}</p>
                <p className="text-lg font-bold text-orange-600">{`${formatNumber(
                  totalPrice
                )} VNĐ`}</p>
              </div>
              <Button
                onClick={() => {
                  if (!isCheckedInfo) {
                    setShowErrorSavedInfo(true);
                    return;
                  }
                  setShowPaymentDialog(true);
                }}
                className="mt-2 bg-orange-600 hover:bg-orange-700 transition-all font-bold"
              >
                Payment
              </Button>
              <SheetClose ref={closeRef} className="hidden">
                close
              </SheetClose>
            </div>
            {showPaymentDialog && (
              <Dialog
                onYes={() => {
                  setShowPaymentDialog(false);
                  closeRef.current?.click();
                }}
                onClose={() => {
                  setShowPaymentDialog(false);
                }}
                buttonContent={"Yes"}
                message={"Are you sure want to booking this flight."}
                content={
                  "You will get a ticket to booking this flight, you cannot undo this action !!"
                }
              />
            )}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
