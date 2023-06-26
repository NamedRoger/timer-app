import * as React from 'react';
import {
  Box,
  ChakraProvider,
  Container,
  Heading,
  IconButton,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { MdPlayArrow, MdPause, MdSettings, MdReplay } from 'react-icons/md';
import ConfigurationTimerContext from './contexts/ConfigurationTimerContext';
import useTimer from './hooks/useTimer';
import SettingsForm from './components/settings-form';

import { SETS_ACTIONS } from './reducers/setsReducer';
import { STATUS } from './config/constants';

export default function App() {
  const { state: timerState, dispatch } = React.useContext(ConfigurationTimerContext);
  const buttonRef = React.useRef();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { play, isPlaying, pause, isPaused, reset, timer } = useTimer();
  const [minutes, setMinutes] = React.useState(() => Math.floor(timer / 60));
  const [seconds, setSeconds] = React.useState(() => timer - minutes * 60);

  React.useEffect(() => {
    const calcMinutes = Math.floor(timer / 60);
    setMinutes(calcMinutes);
    setSeconds(() => timer - calcMinutes * 60);
  }, [timer]);
  return (
    <ChakraProvider>
      <VStack
        spacing={10}
        align="center"
        justify="center"
        h="100vh"
        background={STATUS[timerState.status].color}
      >
        <Container centerContent>
          <Container marginBottom="10">
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text fontWeight="bold" fontSize="4xl">
                  SETS
                </Text>
                <Text fontSize="2xl">
                  {timerState.elapsedSets}/{timerState.sets}
                </Text>
              </Box>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Text fontWeight="bold" fontSize="4xl">
                  ROUNDS
                </Text>
                <Text fontSize="2xl">
                  {timerState.elapsedRounds}/{timerState.rounds}
                </Text>
              </Box>
            </Box>
          </Container>
          <Box>
            <div>
              <Heading fontSize="6xl">{STATUS[timerState.status].title}</Heading>
            </div>
          </Box>
          <Box>
            <div>
              <Heading size="4xl" fontSize="9xl">
                <span>
                  {minutes < 10 ? '0' : ''}
                  {minutes}
                </span>
                <span>:</span>
                <span>
                  {seconds < 10 ? '0' : ''}
                  {seconds}
                </span>
              </Heading>
            </div>
          </Box>
        </Container>
        <Container centerContent>
          <Box>
            {isPaused || !isPlaying ? (
              <IconButton
                variant="ghost"
                aria-label="Call Sage"
                fontSize="60px"
                height={20}
                width={20}
                style={{ borderRadius: 100 }}
                icon={<MdPlayArrow />}
                ref={buttonRef}
                onClick={() => {
                  play();
                }}
              />
            ) : null}
            {isPlaying && !isPaused ? (
              <IconButton
                variant="ghost"
                aria-label="Call Sage"
                fontSize="60px"
                height={20}
                width={20}
                style={{ borderRadius: 100 }}
                icon={<MdPause />}
                onClick={() => {
                  pause();
                }}
              />
            ) : null}
            <IconButton
              variant="ghost"
              aria-label="Call Sage"
              fontSize="60px"
              height={20}
              width={20}
              style={{ borderRadius: 100 }}
              onClick={() => {
                reset();
              }}
              icon={<MdReplay />}
            />
          </Box>
        </Container>
        {!isPlaying ? (
          <Container centerContent>
            <Box>
              <IconButton
                onClick={onOpen}
                variant="ghost"
                aria-label="Call Sage"
                fontSize="30px"
                icon={<MdSettings />}
              />
            </Box>
          </Container>
        ) : null}
      </VStack>
      <SettingsForm
        isOpen={isOpen}
        onClose={onClose}
        onPlay={() => {
          play();
        }}
        onChangeInput={(key, value) => {
          dispatch({ type: SETS_ACTIONS.setInput, value, key });
        }}
      />
    </ChakraProvider>
  );
}
