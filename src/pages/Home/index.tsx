import React, {
  MouseEventHandler,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';
import classNames from 'classnames';
import { ErrorModal } from '../../components/ErrorModal';
import History from '../History';
import './index.scss';
import Requests from '../Requests';
import { fetchPluginHashes } from '../../utils/rpc';
import { PluginList } from '../../components/PluginList';
import { getDeveloperMode } from '../../utils/storage';

export default function Home(props: {
  tab?: 'history' | 'network';
}): ReactElement {
  const [error, showError] = useState('');
  const [tab, setTab] = useState<'history' | 'network' | 'plugins'>(
    props.tab || 'history',
  );
  const scrollableContent = useRef<HTMLDivElement | null>(null);
  const [shouldFix, setFix] = useState(false);
  const [developerMode, setDeveloperMode] = useState(false);

  useEffect(() => {
    fetchPluginHashes();
    getDeveloperMode().then(setDeveloperMode);
  }, []);

  useEffect(() => {
    if (props.tab === 'network' && !developerMode) {
      setTab('history');
    }
  }, [props.tab, developerMode]);

  useEffect(() => {
    const element = scrollableContent.current;
    if (!element) return;

    const onScroll = () => {
      if (element.scrollTop > 0) {
        setFix(true);
      } else {
        setFix(false);
      }
    };

    element.addEventListener('scroll', onScroll);

    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, [scrollableContent]);

  return (
    <div
      id="home"
      ref={scrollableContent}
      className="flex flex-col flex-grow overflow-y-auto"
    >
      {error && <ErrorModal onClose={() => showError('')} message={error} />}
      <div
        className={classNames(
          'flex flex-row justify-center items-center z-10',
          {
            'fixed top-9 w-full bg-dark-surface/95 backdrop-blur-glass shadow-glass-sm lg:w-[598px] lg:mt-40':
              shouldFix,
          },
        )}
      >
        {developerMode && (
          <TabSelector
            onClick={() => setTab('network')}
            selected={tab === 'network'}
          >
            Network
          </TabSelector>
        )}
        <TabSelector
          onClick={() => setTab('history')}
          selected={tab === 'history'}
        >
          History
        </TabSelector>
        {developerMode && (
          <TabSelector
            onClick={() => setTab('plugins')}
            selected={tab === 'plugins'}
          >
            Plugins
          </TabSelector>
        )}
      </div>
      <div className="flex-grow">
        {tab === 'history' && <History />}
        {tab === 'network' && developerMode && (
          <Requests shouldFix={shouldFix} />
        )}
        {tab === 'plugins' && (
          <PluginList
            className="p-2 overflow-y-auto"
            showAddButton={developerMode}
          />
        )}
      </div>
    </div>
  );
}

function TabSelector(props: {
  children: string;
  className?: string;
  selected?: boolean;
  onClick: MouseEventHandler;
}): ReactElement {
  return (
    <button
      onClick={props.onClick}
      className={classNames(
        'tab-glass',
        {
          'tab-glass-active': props.selected,
        },
        props.className,
      )}
    >
      {props.children}
    </button>
  );
}
