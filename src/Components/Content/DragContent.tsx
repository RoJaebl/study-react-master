import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { contentState, IDnD } from "../../atoms";

const DragArea = styled.div`
    display: grid;
    grid-template-columns: 5fr 1fr 1fr;
    justify-items: start;
    align-items: stretch;
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;
const Text = styled.span`
    display: flex;
    justify-content: start;
    align-items: center;
    width: 100%;
    height: 100%;
    ::-webkit-scrollbar {
        display: none;
    }
    overflow: scroll;
    overflow-y: hidden;
    white-space: pre-wrap;
    font-size: 1em;
`;
const TextInput = styled(Text)`
    border: 0;
    text-decoration: none;
    font-family: inherit;
    padding: 0px;
    :focus {
        outline: 0;
    }
`;

interface IDragContentProps {
    contents: IDnD[];
    dropContentId: string;
    dragContentId: string;
    index: number;
}
function DragContent({
    contents,
    dropContentId,
    dragContentId,
    index,
}: IDragContentProps) {
    const pText = useRef<HTMLInputElement>(null);
    const [text, setText] = useState("");
    const setContent = useSetRecoilState(contentState);
    const onModify = () => {
        setContent((allContents) => {
            const cpContents = [...allContents[dropContentId]];
            const cpContent = { ...cpContents[index] };
            cpContent.modify = !cpContent.modify;
            cpContents.splice(index, 1);
            cpContents.splice(index, 0, cpContent);
            return { ...allContents, [dropContentId]: cpContents };
        });
        setTimeout(() => {
            pText.current?.focus();
        }, 10);
    };
    const onTrash = () => {
        setContent((allContents) => {
            const cpContents = [...allContents[dropContentId]];
            cpContents.splice(index, 1);
            return { ...allContents, [dropContentId]: cpContents };
        });
    };
    const onCancel = () => {
        setContent((allContents) => {
            const cpContents = [...allContents[dropContentId]];
            const cpContent = { ...cpContents[index] };
            cpContent.modify = false;
            cpContents.splice(index, 1);
            cpContents.splice(index, 0, cpContent);
            return { ...allContents, [dropContentId]: cpContents };
        });
        setText("");
        pText.current?.blur();
    };
    const onChange = (e: React.FormEvent<HTMLInputElement>) =>
        setText(e.currentTarget.value);
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setContent((allContents) => {
            const cpContents = [...allContents[dropContentId]];
            const cpContent = { ...cpContents[index] };
            cpContent.text = text;
            cpContents.splice(index, 1);
            cpContents.splice(index, 0, cpContent);
            return { ...allContents, [dropContentId]: cpContents };
        });
        onCancel();
    };
    return (
        <Draggable draggableId={dragContentId} index={index}>
            {(dragContent) => (
                <DragArea
                    ref={dragContent.innerRef}
                    {...dragContent.draggableProps}
                    {...dragContent.dragHandleProps}
                >
                    <form
                        onSubmit={onSubmit}
                        style={{
                            display: `${
                                contents[index].modify ? "inherit" : "none"
                            }`,
                        }}
                    >
                        <TextInput
                            as="input"
                            type="text"
                            ref={pText}
                            placeholder={
                                contents[index].text === ""
                                    ? `Add task on content`
                                    : contents[index].text
                            }
                            value={text}
                            onBlur={onCancel}
                            onChange={onChange}
                        />
                    </form>
                    <Text
                        style={{
                            display: `${
                                !contents[index].modify ? "inherit" : "none"
                            }`,
                        }}
                    >
                        {contents[index].text}
                    </Text>
                    <FontAwesomeIcon onClick={onModify} icon={faPen} />
                    <FontAwesomeIcon onClick={onTrash} icon={faTrash} />
                </DragArea>
            )}
        </Draggable>
    );
}
export default DragContent;