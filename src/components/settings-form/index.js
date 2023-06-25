/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  Box,
  FormLabel,
  Input,
  Text,
  Icon,
  FormControl,
  Button,
} from '@chakra-ui/react';
import { MdOutlineTimer, MdWorkspacesOutline } from 'react-icons/md';
import ConfigurationTimerContext from '../../contexts/ConfigurationTimerContext';

export default function SettingsForm({ isOpen, onClose, onChangeInput, finalRef, onPlay }) {
  const firstField = React.useRef();
  const { state } = React.useContext(ConfigurationTimerContext);

  const handlePlay = () => {
    onClose();
    onPlay();
  };
  const setInput = (e) => {
    const key = e.target.name;
    const { value } = e.target;
    onChangeInput(key, Number(value));
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      placement="right"
      size="sm"
      initialFocusRef={firstField}
      finalFocusRef={finalRef}
    >
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          <Stack spacing="24px">
            <Text fontWeight="bold" fontSize="xx-large">
              Routine <Icon as={MdWorkspacesOutline} />
            </Text>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="">Rounds</FormLabel>
                <Input
                  value={state.rounds}
                  onChange={setInput}
                  name="rounds"
                  type="number"
                  min={0}
                  placeholder=""
                  ref={firstField}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="">Sets</FormLabel>
                <Input
                  value={state.sets}
                  onChange={setInput}
                  name="sets"
                  type="number"
                  min={0}
                  placeholder=""
                />
              </FormControl>
            </Box>
            <Text fontWeight="bold" fontSize="xx-large">
              Timer <Icon as={MdOutlineTimer} />
            </Text>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="">Preparation</FormLabel>
                <Input
                  value={state.preparation}
                  onChange={setInput}
                  name="preparation"
                  type="number"
                  min={0}
                  placeholder=""
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="">Work</FormLabel>
                <Input
                  value={state.work}
                  onChange={setInput}
                  name="work"
                  type="number"
                  min={0}
                  placeholder=""
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="">Rest</FormLabel>
                <Input
                  value={state.rest}
                  onChange={setInput}
                  name="rest"
                  type="number"
                  min={0}
                  placeholder=""
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel htmlFor="">Rest between Sets</FormLabel>
                <Input
                  value={state.restBetweenSets}
                  onChange={setInput}
                  name="restBetweenSets"
                  type="number"
                  min={0}
                  placeholder=""
                />
              </FormControl>
            </Box>
          </Stack>
        </DrawerBody>
        <DrawerFooter borderTopWidth="1px">
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button background="#00ffbc" onClick={handlePlay}>
            Play
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
