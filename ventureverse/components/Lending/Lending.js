import Link from "next/link";
import styles from "./Lending.module.css";
import Image from "next/image";
import lend from "@/public/lend.jpg";
import found from "@/public/found.jpg";
import start from "@/public/start.jpg";
import like from "@/public/like.jpg";

const Lending = () => {
  return (
    <>
      <header className={styles.header}>
        <Link href="/companies" className={styles.link}>
          <h1 className={styles.title}>ventureVerse</h1>
        </Link>
        <Link href="/companies" className={styles.link}>
          <h2 className={styles.title}>Начать инвестировать!</h2>
        </Link>
      </header>

      <div className={styles.wrap}>
        <section className={styles.welcome}>
          <Image
            src={lend}
            alt="About image"
            className={styles.welcome__image}
          />
          <h2 className={styles.welcome__title}>
            Добро пожаловать в VentureVerse
          </h2>
          <p className={styles.welcome__subtitle}>
            Поможем стартапам и инвесторам встретиться, реализуем ваши мечты.
          </p>

          <Link href="/makecompany" className={styles.welcome__linkbtn}>
            Создать компанию
          </Link>
        </section>

        <section className={styles.about}>
          <h2 className={styles.about__subtitle}>Кто мы и что мы делаем?</h2>
          <p className={styles.about__text}>
            Мы - команда энтузиастов, собравшихся вместе, чтобы воплотить свою
            страсть к инновациям и технологиям в реальность. Мы верим, что
            новаторские идеи могут изменить мир, и наша цель - помочь стартапам
            и инвесторам осуществить свои мечты.
          </p>
          <p className={styles.about__text}>
            Важно, что мы предлагаем не просто платформу для краудфандинга, мы
            стремимся быть источником вдохновения и мотивации для наших
            пользователей. Мы хотим вдохновлять стартаперов на создание
            инноваций, помогать им развивать свои проекты и реализовывать их
            потенциал.
          </p>
          <p className={styles.about__text}>
            Наша команда верит, что каждый человек может стать успешным
            предпринимателем, если у него есть возможность. Мы хотим быть
            источником такой возможности, поддерживая и вдохновляя тех, кто
            стремится изменить мир через инновации и технологии. Мы искренне
            верим в потенциал каждого стартапа и инвестора, и с гордостью
            работаем над тем, чтобы помочь им достичь своих целей и успехов в
            VentureVerse.
          </p>
        </section>

        <section className={styles.investors}>
          <div className={styles.investors__wrapperimage}>
            <Image
              src={found}
              alt="Investors image"
              className={styles.investors__image}
            />
          </div>

          <div className={styles.investors__text}>
            <h2 className={styles.investors__subtitle}>Инвесторы</h2>
            <p>
              У нас вы можете выбрать проект для инвестирования и помочь молодым
              предпринимателям реализовать свои идеи. Мы предоставляем
              возможность инвестировать в различные проекты, от медицинских
              стартапов до криптовалютных проектов. У нас вы найдете то, что вам
              подходит.
            </p>
            <p>
              Вы можете выбрать проект, соответствующий вашим интересам, целям и
              рискам, и внести свой вклад в реализацию потенциально успешных
              идей. Мы предоставляем детальную информацию о проектах, аналитику,
              истории успеха и возможности связаться с предпринимателями, чтобы
              вы могли принимать осознанные решения о своих инвестициях.
            </p>
          </div>
        </section>

        <section className={styles.starts}>
          <div className={styles.starts__text}>
            <h2 className={styles.starts__subtitle}>Стартаперы</h2>
            <p>
              Вы можете разместить свой проект на нашем сайте и получить доступ
              к инвесторам со всего мира. Мы предоставляем возможность показать
              свою идею миллионам людей и получить необходимое финансирование
              для ее реализации. Не упустите свой шанс стать успешным
              предпринимателем.Присоединяйтесь к нашей платформе и разместите
              свой проект на нашем сайте, чтобы получить доступ к глобальной
              сети инвесторов.
            </p>
            <p>
              Мы предоставляем уникальную возможность показать вашу идею
              миллионам людей со всего мира, что может значительно увеличить
              шансы на получение необходимого финансирования для ее реализации.
              Наша команда экспертов также готова оказать профессиональную
              поддержку и консультации, чтобы помочь вам максимально эффективно
              презентовать ваш проект и привлечь внимание потенциальных
              инвесторов.
            </p>
          </div>
          <div className={styles.starts__wrapperimage}>
            <Image
              src={start}
              alt="Startups image"
              className={styles.starts__image}
            />
          </div>
        </section>

        <section className={styles.сonclusion}>
          <div className={styles.сonclusion__text}>
            <h2 className={styles.сonclusion__subtitle}>Вывод</h2>
            <p>
              Присоединяйтесь к нашей платформе, и станьте частью нашего
              динамичного и инновационного сообщества. Мы стремимся создать
              вдохновляющую среду, где стартапы и инвесторы могут встретиться,
              взаимодействовать и сотрудничать для воплощения амбициозных идей в
              жизнь. Наша команда имеет богатый опыт в поддержке и развитии
              стартапов, и мы готовы предложить вам решения, которые помогут вам
              достичь вашей мечты. Не упускайте возможность воплотить свои идеи
              в реальность и стать успешным предпринимателем вместе с нами.
            </p>
          </div>
          <Image
            src={like}
            alt="Startups image"
            className={styles.сonclusion__image}
            height={500}
            width={1000}
          />
        </section>

        <footer className={styles.footer}>
          <Link href="/companies" className={styles.link}>
            VentureVerse 2023.
          </Link>
        </footer>
      </div>
    </>
  );
};

export default Lending;
