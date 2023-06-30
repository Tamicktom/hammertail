import { validadeImageType } from "../../src/components/specific/WorldCreationModal/WorldCreationModal";

describe("Validate image type", () => {
  it("Should return 'image/png' if the image type is valid", () => {
    const imageMymeType = "image/png";
    expect(validadeImageType(imageMymeType)).to.be.equal(imageMymeType);
  });

  it("Should return 'image/jpeg' if the image type is valid", () => {
    const imageMymeType = "image/jpeg";
    expect(validadeImageType(imageMymeType)).to.be.equal(imageMymeType);
  });

  it("Should return '' if the image type is valid", () => {
    const imageMymeType = "image/gif";
    expect(validadeImageType(imageMymeType)).to.be.equal(imageMymeType);
  });

  it("Should return '' if the image type is invalid", () => {
    const imageMymeType = "application/pdf";
    expect(validadeImageType(imageMymeType)).to.be.equal("");
  });
});
