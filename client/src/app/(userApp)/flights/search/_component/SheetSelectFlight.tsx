import { Button } from "@/components/ui/button";
import { IFlight } from "@/interfaces/IFlight";
import Dialog from "@/components/modals/Dialog";
import { formatNumber } from "@/utils/convertTime";
import React, { useEffect, useRef, useState } from "react";
import { SheetClose } from "@/components/ui/sheet";
import ContactInfo from "./ContactInfo";
import { useAppContext } from "@/app/(userApp)/AppProvider";
import TicketType from "./TicketType";
import Overview from "./Overview";
import PassengerItem from "./PassengerItem";
import flightApiRequest from "@/apiRequest/flight";
import { useToast } from "@/components/ui/use-toast";
import Coupon from "@/components/component/Coupon/Coupon";
import Payment from "@/components/component/Payment/Payment";
import paymentApiRequest from "@/apiRequest/payment";

export default function SheetSelectFlight({
  flight,
  iniNumberPassenger,
}: {
  flight: IFlight;
  iniNumberPassenger: string | null;
}) {
  const { toast } = useToast();
  const [discountPrice, setDiscountPrice] = useState(0);
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
  const [infoContact, setInfoContact] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [paymentSlt, setPaymentSlt] = useState("direct");
  const [isCheckedInfo, setIsCheckedInfo] = useState(false);
  const [showErrorSavedInfo, setShowErrorSavedInfo] = useState(false);
  const [infoPassenger, setInfoPassenger] = useState([
    ...new Array(numberPassenger.adult + numberPassenger.child),
  ]);
  const [showErrorSavedPass, setShowErrorSavedPass] = useState(false);
  const refContact = useRef<HTMLDivElement>(null);
  const refPass = useRef<HTMLDivElement>(null);
  const [saved, setSaved] = useState(() => {
    let arr: boolean[] = [];
    [...new Array(numberPassenger.adult + numberPassenger.child)].forEach(
      () => {
        arr.push(false);
      }
    );
    return arr;
  });
  useEffect(() => {
    if (flight && !Number.isNaN(sltSeatType)) {
      setTotalPrice(
        flight.flightSeats[sltSeatType].price *
          (numberPassenger.adult + numberPassenger.child)
      );
    }
  }, [flight, sltSeatType, numberPassenger]);
  const handleAddBillFlight = async () => {
    if (!user) return;
    const body = {
      userId: user.id,
      username: infoContact.firstName + " " + infoContact.lastName,
      email: infoContact.email,
      phone: infoContact.phone,
      airline: flight.airline,
      flightCode: flight.flightCode,
      departureTime: flight.departureTime,
      arrivalTime: flight.arrivalTime,
      from: `${flight.from}  (${flight.fromCode})`,
      to: `${flight.to}  (${flight.toCode})`,
      passenger: JSON.stringify(infoPassenger),
      price: totalPrice - discountPrice,
      isFlightBody: true,
    };
    if (paymentSlt === "momo") {
      try {
        const response = await paymentApiRequest.getMomo(body);
        if (response.status === "success") {
          window.location.href = response.data.payUrl;
        }
      } catch (error) {}
      return;
    }
    if (paymentSlt === "stripe") {
      try {
        const response = await paymentApiRequest.getStripe(body);
        if (response.status === "success") {
          window.location.href = response.data.url;
        }
      } catch (error) {}
      return;
    }
    try {
      const response = await flightApiRequest.addBillFlight(body);
      if (response.status === "success") {
        toast({
          title: "",
          status: "success",
          description: "Booking successfully !",
        });
      }
    } catch (error) {}
  };
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
            <div ref={refContact}></div>
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
            <div ref={refPass}></div>

            <div className="px-6 mt-4">
              <header
                className={`${
                  showErrorSavedPass ? "text-red-500" : ""
                } mt-4 text-lg font-bold`}
              >
                Passenger information
              </header>
              {showErrorSavedPass && (
                <p className="italic text-xs font-light text-red-500">
                  *Save your information before booking.
                </p>
              )}
              <div className="flex flex-col gap-2 mt-2">
                {[...new Array(numberPassenger.adult)].map((el, idx) => {
                  return (
                    <PassengerItem
                      key={idx}
                      id={idx + 1}
                      iD={idx}
                      seatSlt={flight.flightSeats[sltSeatType]}
                      setInfoPassenger={setInfoPassenger}
                      saved={saved}
                      setSaved={setSaved}
                      setShowErrorSavedPass={setShowErrorSavedPass}
                    />
                  );
                })}
                {[...new Array(numberPassenger.child)].map((el, idx) => {
                  return (
                    <PassengerItem
                      key={idx}
                      id={idx + 1}
                      iD={idx + numberPassenger.adult}
                      seatSlt={flight.flightSeats[sltSeatType]}
                      setInfoPassenger={setInfoPassenger}
                      saved={saved}
                      setSaved={setSaved}
                      isChild={true}
                      numberOfAdult={
                        numberPassenger.adult ? numberPassenger.adult : 0
                      }
                      setShowErrorSavedPass={setShowErrorSavedPass}
                    />
                  );
                })}
              </div>
            </div>
            <div className="px-6 mt-3 w-[90%]">
              <Payment paymentSlt={paymentSlt} setPaymentSlt={setPaymentSlt} />
            </div>
            <div className="px-6 pb-6 mt-4">
              <Coupon
                paymentPrice={totalPrice}
                userId={user.id}
                setDiscountPrice={setDiscountPrice}
              />
            </div>
            <div className="items-center px-6 py-1 justify-between bottom-0 flex border-t-[1px]  w-full bg-white">
              <div className="mt-2">
                <p className="text-gray-600 text-sm">{`Total for ${
                  numberPassenger.adult + numberPassenger.child
                } passenger(s) | ${numberPassenger.infant} infant(s)`}</p>
                <p className="text-lg font-bold text-orange-600">{`${formatNumber(
                  totalPrice - discountPrice
                )} VNĐ`}</p>
              </div>
              <Button
                onClick={() => {
                  if (!isCheckedInfo) {
                    setShowErrorSavedInfo(true);
                    refContact.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    return;
                  }
                  let flag = 0;
                  saved.forEach((el, idx) => {
                    if (el === false) {
                      flag = 1;
                    }
                  });
                  if (flag === 1) {
                    setShowErrorSavedPass(true);
                    refPass.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
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
                  handleAddBillFlight();
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
