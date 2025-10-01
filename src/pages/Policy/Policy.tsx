import { useState } from 'react';

export const Policy: React.FC = () => {
  const [isRu, setIsRu] = useState(true);

  const texts = {
    ru: {
      title: 'Политика конфиденциальности',
      effectiveDate: 'Дата вступления в силу:',
      effectiveDateValue: '24 сентября 2025 г.',
      intro: (
        <>
          Приложение <span className="font-[800]">«Сonstruct»</span> (далее — «Приложение»)
          обеспечивает цифровизацию процессов строительства и благоустройства, включая фиксацию
          поставок материалов, контроль выполнения работ и внесение замечаний контролирующими
          органами.
        </>
      ),
      respect:
        'Мы уважаем права пользователей на конфиденциальность и обязуемся защищать их данные.',
      sections: {
        s1: '1. Состав собираемых данных',
        s1Content: (
          <>
            В рамках работы Приложения могут обрабатываться:
            <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
              <li>
                Регистрационные данные: имя, должность, организация, контактный email или телефон.
              </li>
              <li>
                Рабочие данные:
                <ul className="pl-9 list-disc">
                  <li>
                    данные о строительных объектах (координаты полигонов, графики работ, акты,
                    замечания, спецификации);
                  </li>
                  <li>фотографии ТТН, паспортов качества, актов и других документов;</li>
                  <li>записи о ходе выполнения работ и исправлении замечаний.</li>
                </ul>
              </li>
              <li>
                Технические данные: модель устройства, версия ОС, IP-адрес, язык интерфейса, логи
                ошибок.
              </li>
              <li>
                Геопозиция: фиксируется при внесении данных в журнал для подтверждения факта
                посещения объекта.
              </li>
            </ul>
          </>
        ),
        s2: '2. Цели обработки данных',
        s2Content: (
          <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
            <li>обеспечение функционирования Приложения;</li>
            <li>подтверждение достоверности данных строительного контроля;</li>
            <li>ведение электронного строительного журнала;</li>
            <li>хранение истории поставок и контроль сроков выполнения работ;</li>
            <li>улучшение работы Приложения и исправление ошибок.</li>
          </ul>
        ),
        s3: '3. Передача данных третьим лицам',
        s3Content: (
          <>
            Мы не передаем персональные данные третьим лицам, за исключением случаев:
            <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
              <li>выполнения требований законодательства РФ;</li>
              <li>
                использования сервисов хранения и обработки данных (серверы, облачные провайдеры,
                аналитические сервисы), которые не используют данные в собственных целях.
              </li>
            </ul>
          </>
        ),
        s4: '4. Хранение и защита данных',
        s4Content: (
          <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
            <li>Все данные хранятся на защищенных серверах.</li>
            <li>Доступ предоставляется только авторизованным пользователям.</li>
            <li>
              Используются меры защиты от несанкционированного доступа, изменения и удаления данных.
            </li>
          </ul>
        ),
        s5: '5. Права пользователей',
        s5Content: (
          <>
            Пользователи имеют право:
            <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
              <li>запросить доступ к своим данным;</li>
              <li>исправить или удалить данные;</li>
              <li>ограничить использование данных.</li>
            </ul>
            <p className="mt-[30px]">
              Для этого необходимо направить запрос по адресу:{' '}
              <span className="text-[#007AFF] font-[800]">info@toolsdev.org</span>
            </p>
          </>
        ),
        s6: '6. Изменения политики',
        s6Content:
          'Мы можем обновлять настоящую политику. Новая версия публикуется в Приложении и на сайте с указанием даты вступления в силу.',
        s7: '7. Контакты',
        s7Content: (
          <>
            <p className="mb-[30px]">По вопросам конфиденциальности обращайтесь:</p>
            <p>
              Email: <span className="text-[#007AFF] font-[800]">info@toolsdev.org</span>
            </p>
            <p>
              ФИО:{' '}
              <span className="text-[#007AFF] font-[800]">Феоктистов Алексей Александрович</span>
            </p>
          </>
        ),
      },
    },
    en: {
      title: 'Privacy Policy',
      effectiveDate: 'Effective Date:',
      effectiveDateValue: 'September 24, 2025',
      intro: (
        <>
          The application <span className="font-[800]">“Сonstruct”</span> (hereinafter referred to
          as the “Application”) is designed to digitalize construction and landscaping processes,
          including tracking material deliveries, monitoring work progress, and recording comments
          from supervisory authorities.
        </>
      ),
      respect: 'We respect users’ privacy rights and are committed to protecting their data.',
      sections: {
        s1: '1. Data We Collect',
        s1Content: (
          <>
            The Application may collect and process the following data:
            <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
              <li>
                Registration data: name, job title, organization, contact email or phone number.
              </li>
              <li>
                Work-related data:
                <ul className="pl-9 list-disc">
                  <li>
                    information about construction sites (polygon coordinates, work schedules, acts,
                    remarks, specifications);
                  </li>
                  <li>
                    photos of consignment notes, quality certificates, acts, and other documents;
                  </li>
                  <li>records of work progress and correction of remarks.</li>
                </ul>
              </li>
              <li>
                Technical data: device model, OS version, IP address, interface language, error
                logs.
              </li>
              <li>
                Geolocation: recorded when entering data into the journal to confirm on-site
                presence.
              </li>
            </ul>
          </>
        ),
        s2: '2. Purposes of Data Processing',
        s2Content: (
          <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
            <li>ensuring the functioning of the Application;</li>
            <li>verifying the accuracy of construction control data;</li>
            <li>maintaining an electronic construction log;</li>
            <li>storing supply history and monitoring deadlines for work;</li>
            <li>improving the Application and fixing errors.</li>
          </ul>
        ),
        s3: '3. Data Sharing with Third Parties',
        s3Content: (
          <>
            We do not share personal data with third parties, except in the following cases:
            <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
              <li>when required by applicable law;</li>
              <li>
                when using hosting, cloud, or analytics services that ensure data security and do
                not use data for their own purposes.
              </li>
            </ul>
          </>
        ),
        s4: '4. Data Storage and Protection',
        s4Content: (
          <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
            <li>All data is stored on secure servers.</li>
            <li>Access is granted only to authorized users.</li>
            <li>
              Technical and organizational measures are applied to protect data from unauthorized
              access, modification, or deletion.
            </li>
          </ul>
        ),
        s5: '5. User Rights',
        s5Content: (
          <>
            Users have the right to:
            <ul className="pl-9 list-disc marker:text-black marker:text-[12px] marker:font-normal">
              <li>request access to their data;</li>
              <li>correct or delete data;</li>
              <li>restrict data processing.</li>
            </ul>
            <p className="mt-[30px]">
              To exercise these rights, please contact us at:{' '}
              <span className="text-[#007AFF] font-[800]">info@toolsdev.org</span>
            </p>
          </>
        ),
        s6: '6. Policy Updates',
        s6Content:
          'We may update this Privacy Policy. The new version will be published within the Application and on the website with the effective date indicated.',
        s7: '7. Contact Information',
        s7Content: (
          <>
            <p className="mb-[30px]">If you have any questions about this Privacy Policy, please contact us:</p>
            <p>
              Email: <span className="text-[#007AFF] font-[800]">info@toolsdev.org</span>
            </p>
            <p>
              Individual Developer:{' '}
              <span className="text-[#007AFF] font-[800]">Feoktistov Alexey Alexandrovich</span>
            </p>
          </>
        ),
      },
    },
  };

  const t = isRu ? texts.ru : texts.en;

  return (
    <div className="px-[100px] py-[120px] text-black text-[24px] font-[600] leading-[32px]">
      <div className="flex justify-between items-center mb-[36px]">
        <img className="w-[356px] h-[56px]" src="/Logo.webp" />

        <div
          onClick={() => setIsRu(!isRu)}
          className={`w-[140px] h-[70px] rounded-[36px] cursor-pointer flex items-center p-[4px] transition-all duration-300 shadow-[inset_0_4px_6px_rgba(0,0,0,0.1)]
${isRu ? 'bg-[#F3F3F3]' : 'bg-[#007AFF]'}`}>
          <div
            className={`rounded-full text-[32px] font-[700] leading-[43px] w-[66px] h-[64px] flex justify-center items-center transition-all duration-300
${isRu ? 'bg-[#007AFF] text-white' : 'bg-white text-[#4F4F4F] translate-x-[66px]'}`}>
            {isRu ? 'RU' : 'EN'}
          </div>
        </div>
      </div>

      <p className="font-[800] text-[32px] leading-[32px] mb-[30px]">{t.title}</p>
      <p className="text-[24px] font-[600]">
        {t.effectiveDate} <span className="text-[#007AFF] font-[800]">{t.effectiveDateValue}</span>
      </p>
      <p className="mt-[30px]">{t.intro}</p>
      <p className="mt-[30px]">{t.respect}</p>

      <div className="mt-[30px] flex flex-col gap-[30px]">
        <ul>
          <p className="font-[800] mb-[30px]">{t.sections.s1}</p>
          <li className="list-none">{t.sections.s1Content}</li>
        </ul>

        <ul>
          <p className="font-[800] mb-[30px]">{t.sections.s2}</p>
          <li className="list-none">{t.sections.s2Content}</li>
        </ul>

        <ul>
          <p className="font-[800] mb-[30px]">{t.sections.s3}</p>
          <li className="list-none">{t.sections.s3Content}</li>
        </ul>

        <ul>
          <p className="font-[800] mb-[30px]">{t.sections.s4}</p>
          <li className="list-none">{t.sections.s4Content}</li>
        </ul>

        <ul>
          <p className="font-[800] mb-[30px]">{t.sections.s5}</p>
          <li className="list-none">{t.sections.s5Content}</li>
        </ul>

        <ul>
          <p className="font-[800] mb-[30px]">{t.sections.s6}</p>
          <li className="list-none">{t.sections.s6Content}</li>
        </ul>

        <ul>
          <p className="font-[800] mb-[30px]">{t.sections.s7}</p>
          <li className="list-none">{t.sections.s7Content}</li>
        </ul>
      </div>
    </div>
  );
};
