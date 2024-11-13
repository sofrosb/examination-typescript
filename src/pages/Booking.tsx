import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

type BookingProps = {
  setBookingDetails: React.Dispatch<React.SetStateAction<any>>;
};

const Booking = ({ setBookingDetails }: BookingProps) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [people, setPeople] = useState<string | number>("");
  const [shoes, setShoes] = useState<(number | null)[]>([]);
  const [lanes, setLanes] = useState<string | number>("");
  const [error, setError] = useState({
    people: "",
    lanes: "",
  });

  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

  const handlePeopleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numPeople =
      e.target.value === "" ? "" : Math.max(1, Number(e.target.value));

    // Uppdatera antalet skor baserat på antalet spelare
    if (
      typeof lanes === "number" &&
      typeof numPeople === "number" &&
      numPeople > lanes * 4
    ) {
      setError({
        ...error,
        people: `The maximun number of players is ${
          lanes * 4
        } for ${lanes} lanes.`,
      });
    } else {
      setError({ ...error, people: "" });
      setPeople(numPeople);
      setShoes(
        new Array(typeof numPeople === "number" ? numPeople : 0).fill(null)
      );
    }
  };

  const handleLanesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const numLanes =
      e.target.value === "" ? "" : Math.max(1, Number(e.target.value));
    if (
      typeof numLanes === "number" &&
      typeof people === "number" &&
      people > numLanes * 4
    ) {
      setError({
        ...error,
        lanes: `With ${people} players, at least ${Math.ceil(
          people / 4
        )} lanes are required.`,
      });
    } else {
      setError({ ...error, lanes: "" });
      setLanes(numLanes);
    }
  };

  const handleShoeSizeChange = (index: number, value: number | string) => {
    const newShoes = Array.isArray(shoes) ? [...shoes] : [];
    newShoes[index] = value === "" ? null : Number(value);
    setShoes(newShoes);
  };

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      typeof lanes === "number" &&
      typeof people === "number" &&
      people > lanes * 4
    ) {
      setError({
        ...error,
        lanes:
          "The number of players exceeds the maximum limit for the number of lanes.",
      });
      return;
    }

    const bookingData = {
      when: `${date}T${time}:00`,
      lanes,
      people,
      shoes,
    };

    try {
      const response = await fetch(`${baseUrl}`, {
        method: "POST",
        headers: {
          "x-api-key": apiKey,
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response from server:", errorText);
        throw new Error("Something went wrong with the booking");
      }

      const responseData = await response.json();
      setBookingDetails(responseData);

      console.log("Booking response:", responseData);

      navigate("/confirmation");
    } catch (error) {
      console.error("Booking error:", error);
    }
  };

  return (
    <main className="wrapper">
      <img src="./src/assets/logo.svg" className="logo-small" />
      <Title title="BOOKING" />
      <h2 className="section-header">WHEN, WHAT & WHO</h2>
      <form onSubmit={handleBooking}>
        <article className="first-line">
          <fieldset className="input-group">
            <legend>DATE</legend>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="input-group">
            <legend>TIME</legend>
            <input
              type="time"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
            />
          </fieldset>
        </article>
        <fieldset className="input-group">
          <legend>NUMBER OF AWESOME BOWLERS</legend>
          <input
            type="number"
            id="people"
            name="people"
            value={people}
            onChange={handlePeopleChange}
            required
          />{" "}
          pers
          {error.people && <span className="error-text">{error.people}</span>}
        </fieldset>
        <fieldset className="input-group">
          <legend>NUMBER OF LANES</legend>
          <input
            type="number"
            id="lanes"
            name="lanes"
            value={lanes}
            onChange={handleLanesChange}
            required
          />{" "}
          {lanes === 1 ? "lane" : "lanes"}
          {error.lanes && <span className="error-text">{error.lanes}</span>}
        </fieldset>

        {typeof people === "number" && people > 0 && (
          <section className="shoe-section">
            <h2 className="section-header">SHOES</h2>
            {Array.isArray(shoes) &&
              shoes.map((size, index) => (
                <fieldset className="input-group" key={index}>
                  <legend>Shoe Size / Person #{index + 1}</legend>
                  <select
                    value={size === null ? "" : size}
                    onChange={(e) =>
                      handleShoeSizeChange(index, e.target.value)
                    }
                    required
                  >
                    <option value="" disabled>
                      Select Size
                    </option>
                    {[...Array(31)].map((_, i) => {
                      const shoeSize = 20 + i;
                      return (
                        <option key={shoeSize} value={shoeSize}>
                          Euro {shoeSize}
                        </option>
                      );
                    })}
                  </select>
                </fieldset>
              ))}
          </section>
        )}
        <button>STRIIIIIIKE!</button>
      </form>
    </main>
  );
};

export default Booking;
