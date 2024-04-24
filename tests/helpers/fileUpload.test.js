import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from "../../src/helpers/fileUpload";

cloudinary.config({
    cloud_name: "dlkboaa4x",
    api_key: "942822918515671",
    api_secret: "l1Bug_Lr6oem2KKmaOgTVrbZ9qw",
    secure: true
});

describe("testing fileUpload", () => {
  test("should upload the file correctly to cloudinary", async () => {
    const imageUrl =
      "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png";
    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], "image.jpg");
    const url = await fileUpload(file);

    expect(typeof url).toBe("string");

    // console.log(url);
    // Obtiene el id de la imagen de cloudinary desde la url
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".png", "");

    const cloudResp = await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: "image",});
    // console.log(cloudResp);
  });

  test("should return null", async () => {
    const file = new File([], "image.jpg");
    const url = await fileUpload(file);

    expect(url).toBe(null);
  });
});
