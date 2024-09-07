import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <h3 className={css.notFound}>NotFoundPage</h3>

      <p className={css.notFoundText}>
        Please use this link to go <Link to="/">back home</Link>
      </p>
    </div>
  );
}
