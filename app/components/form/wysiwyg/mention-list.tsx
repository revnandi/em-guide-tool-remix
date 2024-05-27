import { SuggestionProps } from "@tiptap/suggestion";
import React, {
  useRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/command";
import { Popover, PopoverAnchor, PopoverContent } from "~/components/popover";

export default forwardRef((props: SuggestionProps, ref) => {
  console.log(props);
  let mentionRef: React.RefObject<Element> = useRef(props.decorationNode);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(true);

  const selectItem = (index: number) => {
    const item = props.items[index];
    if (item) {
      props.command({ id: item });
    }
    setIsOpened(false);
  };

  const upHandler = () => {
    setSelectedIndex(
      (selectedIndex + props.items.length - 1) % props.items.length
    );
  };

  const downHandler = () => {
    setSelectedIndex((selectedIndex + 1) % props.items.length);
  };

  const enterHandler = () => {
    selectItem(selectedIndex);
  };

  useEffect(() => setSelectedIndex(0), [props.items]);

  useImperativeHandle(ref, () => ({
    onKeyDown: ({ event }: { event: React.KeyboardEvent }) => {
      if (event.key === "ArrowUp") {
        upHandler();
        return true;
      }

      if (event.key === "ArrowDown") {
        downHandler();
        return true;
      }

      if (event.key === "Enter") {
        enterHandler();
        return true;
      }

      return false;
    },
  }));

  return (
    <Popover open={isOpened}>
      <PopoverAnchor virtualRef={mentionRef} />
      <PopoverContent className="p-0" side="right" align="start">
        <Command>
          <CommandInput placeholder="Mention someone..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {props.items.map((item, index) => (
                <CommandItem
                  key={index}
                  value={item}
                  onSelect={() => selectItem(index)}
                >
                  {item}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
