interface SubtitleInputTextDataProps {
  text?: string;
}

export function SubtitleInputText(
  subtitleInputText: SubtitleInputTextDataProps
) {
  return (
    <div className="mx-7">
      <ul className="list-outside list-disc">
        <li className="text-red-500">
          {subtitleInputText.text ? subtitleInputText.text : "Error"}
        </li>
      </ul>
    </div>
  );
}
