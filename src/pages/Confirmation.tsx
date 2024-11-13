import Title from "../components/Title";

type BookingDetailsType = {
  when: string;
  lanes: number;
  people: number;
  shoes: number[];
  price: number;
  id: string;
  active: boolean;
};

type ConfirmationProps = {
  bookingDetails: BookingDetailsType;
};

function formatDateTime(dateString: string): string {
  const date = new Date(dateString);

  const time = date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formattedDate = date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "short",
  });

  return `${time}, ${formattedDate}`;
}

const Confirmation = ({ bookingDetails }: ConfirmationProps) => {
  if (!bookingDetails) {
    return (
      <p className="no-booking">
        No booking information found. Please return to booking page.
      </p>
    );
  }

  return (
    <main className="wrapper">
      <img src="./src/assets/logo.svg" className="logo-small" />
      <Title title="SEE YOU SOON!" />
      <h2 className="section-header">BOOKING DETAILS</h2>
      <form action="">
        <fieldset className="input-group">
          <legend>WHEN</legend>
          <p className="booking-info">{formatDateTime(bookingDetails.when)}</p>
        </fieldset>
        <fieldset className="input-group">
          <legend>WHO</legend>
          <p className="booking-info">{bookingDetails.people}</p>
        </fieldset>
        <fieldset className="input-group">
          <legend>LANES</legend>
          <p className="booking-info">{bookingDetails.lanes}</p>
        </fieldset>
        <fieldset className="input-group">
          <legend>BOOKING NUMBER</legend>
          <p className="booking-info">{bookingDetails.id}</p>
        </fieldset>

        <section className="total-wrapper">
          <article className="total">
            total
            <p className="price">{bookingDetails.price} sek</p>
          </article>
          <button>Sweet, let's go!</button>
        </section>
      </form>
    </main>
  );
};

export default Confirmation;
