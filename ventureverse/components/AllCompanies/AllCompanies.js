import { useEffect, useRef, useState } from 'react';
import { ventureVerse, ventureVerseWithSigner } from '@/utils/ventureverse';
import { formatEther, parseEther } from 'ethers';
import styles from './AllCompanies.module.css';

const AllCompanies = () => {
  const [errMessage, setErrMessage] = useState('');
  const [sucMessage, setSucMessage] = useState('');
  const [comps, setComps] = useState([]);
  const [index, setIndex] = useState();
  const [show, setShow] = useState(0);

  const amountRef = useRef();

  useEffect(() => {
    getComp();
  }, []);

  const getComp = async () => {
    setErrMessage('');
    try {
      const index = await ventureVerse.indexCompany();
      const response = [];
      for (let i = 0; i < index; i++) {
        const resp = await ventureVerse.companies(i);
        response.push(resp);
      }
      setComps(response);
      setShow(2);
    } catch (error) {
      setShow(1);
      setErrMessage('Что-то пошло не так');
      console.error(error);
    }
  };

  const getDate = (time) => {
    return new Date(Number(time) * 1000).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
    });
  };

  const handleSendDonate = async (i) => {
    setErrMessage('');
    setSucMessage('');
    setShow(3);
    setIndex(i);
  };

  const sendDonate = async (e) => {
    e.preventDefault();
    setErrMessage('');
    setSucMessage('');
    console.log('старт');
    const amount = amountRef.current.value;
    if (!amount) {
      setErrMessage('Enter amount');
      return;
    }
    setShow(0);
    try {
      const contract = await ventureVerseWithSigner();
      const response = await contract.makeDonation(index, {
        value: parseEther(`${amount}`),
      });
      await response.wait();
      setShow(4);
      setSucMessage(response.hash);
    } catch (error) {
      setErrMessage('Вероятно у вас нет денег');
      setShow(1);
      console.error(error);
    }
  };

  return (
    <div className={styles.wrap}>
      {show === 0 && (
        <div className={styles.wrapspin}>
          <div className={styles.dot_spinner}>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
            <div className={styles.dot_spinner__dot}></div>
          </div>
        </div>
      )}

      {show === 1 && (
        <div className={styles.err}>
          <h3>{errMessage}</h3>
          <button className={styles.submit} onClick={() => setShow(2)}>
            Назад
          </button>
        </div>
      )}

      {show === 2 && (
        <ul className={styles.uls}>
          {comps.map((comp, index) => (
            <li className={styles.card} key={index}>
              <div className={styles.card_details}>
                <p className={styles.text_title}>{comp.title}</p>
                <p className={styles.text_body}>{`Проект: ${comp.desc}`}</p>
                <p className={styles.text_body}>{`Дата окончания ${getDate(comp.end)}`}</p>
                <p className={styles.text_body}>{`Собрано: ${formatEther(comp.nowDonate)}`}</p>
                <p className={styles.text_body}>{`Сбор: ${formatEther(comp.needDonate)}`}</p>
              </div>
              <button className={styles.card_button} onClick={() => handleSendDonate(comp.index)}>
                Поддержать
              </button>
            </li>
          ))}
        </ul>
      )}

      {show === 3 && (
        <form className={styles.form} onSubmit={sendDonate}>
          <div className={styles.input__container}>
            <label className={styles.labels} htmlFor="amount">
              Сколько отправить?
            </label>
            <input
              ref={amountRef}
              className={styles.inputs}
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter amount"
              step="any"
            />
          </div>
          <div className={styles.btns}>
            <input className={styles.submit} type="submit" value="Send" />
            <button className={styles.submit} onClick={() => setShow(2)}>
              Назад
            </button>
          </div>

          {errMessage && (
            <div className={styles.error}>
              <h3>{errMessage}</h3>
            </div>
          )}
          {sucMessage && show === 2 && (
            <div className={styles.suc}>
              <h4>{sucMessage}</h4>
            </div>
          )}
        </form>
      )}

      {show === 4 && (
        <div className={styles.suc}>
          <h3>{sucMessage}</h3>
          <button className={styles.submit} onClick={() => setShow(2)}>
            Назад
          </button>
        </div>
      )}
    </div>
  );
};

export default AllCompanies;
