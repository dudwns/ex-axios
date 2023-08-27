import ReactDOM from "react-dom";
import ToastManager from "./ToastManager";

export type CreateToastFunction = (message: string, duration: number) => void;

class Toast {
  portal = null as null | HTMLElement;
  createToast: CreateToastFunction | null = null;
  constructor() {
    const portalId = "toast-portal";
    const portalElement = document.getElementById(portalId);

    if (portalElement) {
      this.portal = portalElement;
      return;
    } else {
      this.portal = document.createElement("div");
      this.portal.id = portalId;
      document.body.appendChild(this.portal);
    }

    ReactDOM.render(
      <ToastManager
        bind={(createToast: CreateToastFunction): void => {
          this.createToast = createToast;
        }}
      />,
      this.portal
    );
  }

  show(message: string, duration = 2000) {
    this.createToast!(message, duration);
  }
}

export default new Toast();
