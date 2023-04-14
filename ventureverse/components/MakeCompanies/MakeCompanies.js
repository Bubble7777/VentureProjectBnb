import { useState, useRef } from "react";
import styles from "./MakeCompanies.module.css";
import Link from "next/link";
import { parseTime } from "@/utils/parsetime";
import { checkDate } from "@/utils/checkdate";
import { ventureVerseWithSigner } from "@/utils/ventureverse";
import { parseEther } from "ethers";

const MakeCompanies = () => {
  const [show, setShow] = useState(0);

  const addressRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();
  const endRef = useRef();
  const needRef = useRef();

  const [address, setAddress] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [end, setEnd] = useState();
  const [need, setNeed] = useState();

  const [sucMessage, setSucMessage] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const [loading, setLoading] = useState(false);

  const submitMakeCompany = (e) => {
    e.preventDefault();
    setErrMessage("");
    setSucMessage("");
    if (
      !addressRef.current.value ||
      !titleRef.current.value ||
      !descRef.current.value ||
      !endRef.current.value ||
      !needRef.current.value
    ) {
      setErrMessage("Заполните поля");
      return;
    }
    if (!checkDate(endRef.current.value)) {
      setErrMessage("конец в прошлом?");
      console.log(errMessage);
      return;
    }

    setAddress(addressRef.current.value);
    setTitle(titleRef.current.value);
    setDesc(descRef.current.value);
    setEnd(parseTime(endRef.current.value));
    setNeed(parseEther(needRef.current.value));

    setShow(1);
  };

  const MakeCompany = async (e) => {
    e.preventDefault();
    setErrMessage("");
    setSucMessage("");
    setLoading(true);
    try {
      const contract = await ventureVerseWithSigner();
      const response = await contract.createCompany(
        address,
        title,
        desc,
        end,
        need,
        {
          value: parseEther("0.01"),
        }
      );
      await response.wait();
      setShow(2);
      setSucMessage(response.hash);
    } catch (error) {
      setErrMessage("Вероятно у вас нет денег");
      setShow(0);
      console.error(error);
    }
  };
  return (
    <div className={styles.wrap}>
      {show === 0 && (
        <form className={styles.form} onSubmit={submitMakeCompany}>
          <p className={styles.form__title}>Создать компанию:</p>
          <div className={styles.input__container}>
            <label className={styles.labels} htmlFor="address">
              Owner of company address:{" "}
            </label>
            <input
              ref={addressRef}
              className={styles.inputs}
              type="text"
              name="address"
              id="address"
              placeholder="Address"
            />
          </div>

          <div className={styles.input__container}>
            <label className={styles.labels} htmlFor="name">
              Name your company:{" "}
            </label>
            <input
              ref={titleRef}
              className={styles.inputs}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
            />
          </div>
          <div className={styles.input__container}>
            <label className={styles.labels} htmlFor="desc">
              Description of your company:{" "}
            </label>
            <input
              ref={descRef}
              className={styles.inputs}
              type="text"
              name="desc"
              id="desc"
              placeholder="Desc"
            />
          </div>
          <div className={styles.input__container}>
            <label className={styles.labels} htmlFor="end">
              End donate to your company:{" "}
            </label>
            <input
              ref={endRef}
              className={styles.inputs}
              type="date"
              name="end"
              id="end"
              placeholder="End"
            />
          </div>
          <div className={styles.input__container}>
            <label className={styles.labels} htmlFor="donate">
              Need donate to you company:{" "}
            </label>
            <input
              ref={needRef}
              className={styles.inputs}
              type="number"
              name="donate"
              id="donate"
              placeholder="Need donate"
              step="any"
            />
          </div>
          <input className={styles.submit} type="submit" value="Добавить" />
        </form>
      )}

      {show === 1 && (
        <div className={styles.form}>
          {loading ? (
            <>
              <div>Making...</div>
              <div
                aria-label="Orange and tan hamster running in a metal wheel"
                role="img"
                className={styles.wheel_and_hamster}
              >
                <div className={styles.wheel}></div>
                <div className={styles.hamster}>
                  <div className={styles.hamster__body}>
                    <div className={styles.hamster__head}>
                      <div className={styles.hamster__ear}></div>
                      <div className={styles.hamster__eye}></div>
                      <div className={styles.hamster__nose}></div>
                    </div>
                    <div
                      className={
                        styles.hamster__limb + " " + styles.hamster__limb__fr
                      }
                    ></div>
                    <div
                      className={
                        styles.hamster__limb + " " + styles.hamster__limb__fl
                      }
                    ></div>
                    <div
                      className={
                        styles.hamster__limb + " " + styles.hamster__limb__br
                      }
                    ></div>
                    <div
                      className={
                        styles.hamster__limb + " " + styles.hamster__limb__bl
                      }
                    ></div>
                    <div className={styles.hamster__tail}></div>
                  </div>
                </div>
                <div className={styles.spoke}></div>
              </div>
            </>
          ) : (
            <>
              <p className={styles.form__title}>Вы уверены?</p>
              <p className={styles.form__title}>
                Стоимость создания компании 0.01 BNB
              </p>
              <button className={styles.submit} onClick={MakeCompany}>
                Да
              </button>
            </>
          )}
        </div>
      )}

      {show === 2 && (
        <div className={styles.form}>
          <p className={styles.form__title}>Ваша компания успешно создана!</p>
          <Link className={styles.links} href="companies">
            Перейти к ее просмотру
          </Link>
        </div>
      )}
      {sucMessage && show === 2 && (
        <div className={styles.suc}>
          <h4>Хэш транзакции:</h4>
          <h4>{sucMessage}</h4>
        </div>
      )}
      {errMessage && (
        <div className={styles.err}>
          <h3>{errMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default MakeCompanies;
