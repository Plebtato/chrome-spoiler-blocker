import { Badge, CloseButton } from "react-bootstrap";

const KeywordBadge = ({ keyword, item, remove }) => {
  return (
    <Badge className="keyword-badge" bg="secondary" pill>
      {keyword}{" "}
      <CloseButton variant="white" onClick={() => remove(item, keyword)} />
    </Badge>
  );
};

export default KeywordBadge;
