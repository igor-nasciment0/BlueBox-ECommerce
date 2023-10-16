import Rodape from "../../components/rodape/index.js";
import CabecalhoLogo from "../../components/cabecalhoLogo/index.js";
import "./index.scss";

export default function TelaPagamentoPix() {
  return (
    <div className="pagamento-pix">
      <CabecalhoLogo />
      <main>
        <div className="qr-code-pix">
          <div className="titulo-pagamento">
            <h1>PAGAMENTO</h1>
          </div>

          <div className="pagamento-total">
            <h4>Pagamento total</h4>
            <h4 className="preco">39,99</h4>
          </div>

          <div className="prazo-pagamento">
            <div className="pagamento-total">
              <h4>Pagar em até</h4>
              <div className="data-prazo">
                <p className="tempo-restante">
                  23 HORAS 48 MINUTOS 20 SEGUNDOS
                </p>
                <p>Vencimento em 21 jun 2023, 13:30</p>
              </div>
            </div>
          </div>

          <div className="simbolo-pix">
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="38"
              height="38"
              viewBox="0 0 38 38"
              fill="none"
            >
              <path
                d="M28.1119 27.2565C27.4748 27.2579 26.8436 27.1357 26.2549 26.8969C25.6662 26.6581 25.1316 26.3075 24.6819 25.8653L19.728 21.0125C19.5527 20.8493 19.32 20.7583 19.0781 20.7583C18.8362 20.7583 18.6036 20.8493 18.4282 21.0125L13.4554 25.8838C13.0059 26.3262 12.4713 26.677 11.8826 26.9157C11.2939 27.1545 10.6627 27.2766 10.0255 27.275H9.04883L15.3238 33.422C17.2817 35.34 20.4593 35.34 22.4173 33.422L28.7087 27.2565H28.1119ZM10.0255 10.0912C11.3229 10.0912 12.5401 10.5857 13.4554 11.4823L18.4282 16.3537C18.5137 16.4375 18.6152 16.5041 18.7269 16.5495C18.8386 16.5948 18.9584 16.6182 19.0793 16.6182C19.2002 16.6182 19.32 16.5948 19.4317 16.5495C19.5434 16.5041 19.6449 16.4375 19.7304 16.3537L24.6843 11.5008C25.1335 11.0587 25.6677 10.7081 26.256 10.4694C26.8444 10.2306 27.4751 10.1083 28.1119 10.1097H28.7087L22.4173 3.94651C21.4764 3.02545 20.2007 2.50806 18.8705 2.50806C17.5404 2.50806 16.2647 3.02545 15.3238 3.94651L9.04883 10.0935L10.0255 10.0912Z"
                fill="#2DB483"
              />
              <path
                d="M33.9155 15.2077L30.1128 11.4825C30.0275 11.5168 29.9362 11.5349 29.8439 11.5356H28.1148C27.2207 11.5356 26.3455 11.8915 25.7156 12.5108L20.7617 17.3637C20.5414 17.5807 20.2795 17.7528 19.9911 17.8703C19.7026 17.9878 19.3933 18.0483 19.081 18.0483C18.7686 18.0483 18.4593 17.9878 18.1708 17.8703C17.8824 17.7528 17.6205 17.5807 17.4002 17.3637L12.4274 12.49C11.7894 11.8676 10.9263 11.5171 10.0259 11.5148H7.90283C7.81481 11.5142 7.72767 11.4977 7.64569 11.4663L3.82883 15.2077C1.87086 17.1257 1.87086 20.2385 3.82883 22.1588L7.64569 25.8979C7.72676 25.8659 7.8131 25.8487 7.90047 25.847H10.0259C10.9223 25.847 11.7952 25.4935 12.4274 24.8741L17.3978 20.0005C17.8513 19.5775 18.4536 19.3415 19.0798 19.3415C19.706 19.3415 20.3082 19.5775 20.7617 20.0005L25.7156 24.8533C26.3455 25.4727 27.2207 25.8262 28.1148 25.8262H29.8439C29.9383 25.8262 30.0303 25.8493 30.1128 25.8817L33.9155 22.1565C35.8735 20.2385 35.8735 17.1257 33.9155 15.2077Z"
                fill="#2DB483"
              />
            </svg>{" "}
            <p>PIX</p>
          </div>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="241"
            height="197"
            viewBox="0 0 241 197"
            fill="none"
          >
            <path
              d="M0.875 65.5009H80.625V0.217285H0.875V65.5009ZM14.1667 11.0979H67.3333V54.6203H14.1667V11.0979ZM27.4583 21.9785H54.0417V43.7397H27.4583V21.9785ZM160.375 65.5009H240.125V0.217285H160.375V65.5009ZM173.667 11.0979H226.833V54.6203H173.667V11.0979ZM186.958 21.9785H213.542V43.7397H186.958V21.9785ZM0.875 196.068H80.625V130.784H0.875V196.068ZM14.1667 141.665H67.3333V185.187H14.1667V141.665ZM27.4583 152.546H54.0417V174.307H27.4583V152.546ZM226.833 174.307H240.125V196.068H213.542V163.426H226.833V174.307ZM226.833 141.665H240.125V152.546H226.833V141.665ZM226.833 130.784V141.665H213.542V130.784H226.833ZM93.9167 152.546H107.208V196.068H93.9167V152.546ZM40.75 76.3815V98.1427H14.1667V87.2621H0.875V76.3815H40.75ZM93.9167 43.7397H107.208V54.6203H93.9167V43.7397ZM133.792 11.0979V32.8591H120.5V0.217285H147.083V11.0979H133.792ZM93.9167 11.0979H107.208V21.9785H93.9167V11.0979ZM226.833 98.1427H240.125V119.904H213.542V109.023H226.833V98.1427ZM213.542 76.3815V87.2621H186.958V109.023H160.375V98.1427H173.667V76.3815H213.542ZM120.5 119.904H107.208V109.023H93.9167V98.1427H120.5V119.904ZM200.25 141.665H213.542V152.546H200.25V141.665ZM226.833 87.2621V98.1427H213.542V87.2621H226.833ZM107.208 119.904V130.784H93.9167V119.904H107.208ZM186.958 174.307H200.25V196.068H173.667V174.307H186.958ZM147.083 174.307H160.375V185.187H147.083V196.068H120.5V185.187H133.792V174.307H147.083ZM147.083 163.426V152.546H173.667V163.426H147.083ZM147.083 109.023H160.375V141.665H147.083V152.546H133.792V163.426H120.5V141.665H107.208V130.784H147.083V119.904H133.792V109.023H147.083ZM27.4583 109.023V119.904H14.1667V109.023H27.4583ZM186.958 152.546H173.667V141.665H186.958V152.546ZM200.25 130.784H173.667V119.904H200.25V130.784ZM67.3333 76.3815H80.625V87.2621H67.3333V98.1427H80.625V119.904H67.3333V109.023H54.0417V119.904H40.75V98.1427H54.0417V76.3815H67.3333ZM107.208 76.3815V54.6203H147.083V87.2621H120.5V76.3815H133.792V65.5009H120.5V76.3815H107.208ZM107.208 32.8591H120.5V43.7397H107.208V32.8591ZM93.9167 76.3815H107.208V87.2621H93.9167V76.3815ZM133.792 43.7397V32.8591H147.083V43.7397H133.792Z"
              fill="black"
            />
          </svg>

          <button className="copiar-codigo">Copiar código PIX</button>
        </div>
      </main>
      <Rodape />
    </div>
  );
}
