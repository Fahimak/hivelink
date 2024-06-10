import LineBreak from "components/LineBreak";

interface Props {
  productUrl: string;
  handleUrlChange: any;
}

const ShoppableLinkEdit = ({ productUrl, handleUrlChange }: Props) => {
  return (
    <>
      <h4 className="upload_headings">Shoppable Link</h4>
      <LineBreak />
      <div className="upload_title_input">
        <input
          className="video_upload_title"
          value={productUrl}
          onInput={handleUrlChange}
          placeholder="https://example.com"
        />
        <div className="character_limit text-sm">
          {productUrl ? productUrl.length : 0}/180
        </div>
      </div>
      <LineBreak />
    </>
  );
};

export default ShoppableLinkEdit;
