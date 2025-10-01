import { useState } from 'react';
import { Header, TabsControl } from '../../widgets';
import { tabs } from './data';
import { VedomostiTable } from './VedomostiTable';

export const Vedomosti: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div>
      <Header
        title="Ведомости"
        subtitle="Перечень всех материалов необходимых для реализации проекта"
      />

      <div className='mb-[30px] max-w-[680px]'>
        <TabsControl tabs={tabs} active={activeTab} onChange={setActiveTab} />
      </div>

      {activeTab === 'all' ? <VedomostiTable /> : null}
    </div>
  );
};
