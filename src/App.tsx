import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Menu from "./components/Menu";
import Loading from "./pages/Loading";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";

function App() {
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  return (
    <>
      <Menu />
      <Routes>
        <Route path="/" element={<Loading />} />
        <Route
          path="booking"
          element={<Booking setBookingDetails={setBookingDetails} />}
        />
        <Route
          path="confirmation"
          element={<Confirmation bookingDetails={bookingDetails} />}
        />
      </Routes>
    </>
  );
}

export default App;
