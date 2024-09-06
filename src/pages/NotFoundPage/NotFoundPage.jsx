import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div>
      <h3>NotFoundPage</h3>

      <p>
        Please use this link to go <Link to="/">back home</Link>
      </p>
    </div>
  );
}
