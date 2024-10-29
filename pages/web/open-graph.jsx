import React from "react";
import _ from "lodash";

import TwoColumn from "@components/TwoColumn";
import MyCard from "@components/MyCard";
import MySelect from "@components/MySelect";
import MyInput from "@components/MyInput";
import MyTextarea from "@components/MyTextarea";
import MyCodeEditor from "@components/MyCodeEditor";

const PAGE_TYPES = [
  { value: "website", label: "Website" },
  { value: "article", label: "Article" },
  { value: "book", label: "Book" },
  { value: "profile", label: "Profile" },
  { value: "video", label: "Video" },
  { value: "music", label: "Music" },
];

const TWITTER_CARD_TYPES = [
  { value: "summary", label: "Summary" },
  { value: "summary_large_image", label: "Summary with Large Image" },
  { value: "app", label: "Application" },
  { value: "player", label: "Player" },
];

const OpenGraphMetaGenerator = () => {
  const [pageType, setPageType] = React.useState("website");

  const [general, setGeneral] = React.useState({
    title: "",
    description: "",
    page_url: "",
  });

  const [imageInfo, setImageInfo] = React.useState({
    image_url: "",
    image_alt: "",
    width: "",
    height: "",
  });

  const [twitter, setTwitter] = React.useState({
    card_type: "summary",
    site_account: "",
    creator_account: "",
  });

  const [article, setArticle] = React.useState({
    published_date: "",
    modified_date: "",
    expiration_date: "",
    author: "",
    section: "",
    tag: "",
  });

  const [book, setBook] = React.useState({
    author: "",
    isbn: "",
    release_date: "",
    tag: "",
  });

  const [profile, setProfile] = React.useState({
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
  });

  const [output, setOutput] = React.useState("");

  const generateMetaTags = React.useMemo(
    () =>
      _.debounce((data) => {
        let output = `<!-- og meta -->\n`;
        output += `<meta property="og:type" value="${data.pageType}" />\n`;

        if (data.pageType === "profile") {
          Object.keys(data.profile).forEach((key) => {
            if (data.profile[key]) {
              output += `<meta property="og:profile:${key}" value="${data.profile[key]}" />\n`;
            }
          });
        }

        if (data.pageType === "article") {
          Object.keys(data.article).forEach((key) => {
            if (data.article[key]) {
              output += `<meta property="og:article:${key}" value="${data.article[key]}" />\n`;
            }
          });
        }

        if (data.pageType === "book") {
          Object.keys(data.book).forEach((key) => {
            if (data.book[key]) {
              output += `<meta property="og:book:${key}" value="${data.book[key]}" />\n`;
            }
          });
        }

        Object.keys(data.general).forEach((key) => {
          if (data.general[key]) {
            output += `<meta property="og:${key}" value="${data.general[key]}" />\n`;
          }
        });

        Object.keys(data.imageInfo).forEach((key) => {
          if (data.imageInfo[key]) {
            output += `<meta property="og:image:${key}" value="${data.imageInfo[key]}" />\n`;
          }
        });

        output += `\n<!-- twitter meta -->\n`;
        Object.keys(data.twitter).forEach((key) => {
          if (data.twitter[key]) {
            output += `<meta name="twitter:${key}" value="${data.twitter[key]}" />\n`;
          }
        });

        setOutput(output);
      }, 200),
    [],
  );

  React.useEffect(() => {
    generateMetaTags({
      pageType,
      general,
      imageInfo,
      twitter,
      article,
      book,
      profile,
    });
  }, [
    pageType,
    general,
    imageInfo,
    twitter,
    article,
    book,
    profile,
    generateMetaTags,
  ]);

  return (
    <TwoColumn>
      <TwoColumn.Left>
        <MyCard.Header
          title="Input"
          helper="Enter the details for the Open Graph meta tags"
        />

        <div className="h-full overflow-y-auto">
          <p className="font-semibold">General Information</p>
          <table className="w-full">
            <tbody>
              <tr className="border-y">
                <td className="py-1 max-w-40">Page Type</td>
                <td className="py-1">
                  <MySelect value={pageType} onChange={setPageType} sizing="md">
                    {PAGE_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </MySelect>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Title</td>
                <td className="py-1">
                  {" "}
                  <MyInput
                    value={general.title}
                    onChange={(value) =>
                      setGeneral({ ...general, title: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Description</td>
                <td className="py-1">
                  <MyTextarea
                    value={general.description}
                    onChange={(value) =>
                      setGeneral({ ...general, description: value })
                    }
                    rows={2}
                    className="w-full"
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Page URL</td>
                <td className="py-1">
                  <MyInput
                    value={general.page_url}
                    onChange={(value) =>
                      setGeneral({ ...general, page_url: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <p className="font-semibold mt-4">Image Information</p>
          <table className="w-full">
            <tbody>
              <tr className="border-y">
                <td className="py-1 max-w-40">Image URL</td>
                <td className="py-1">
                  <MyInput
                    value={imageInfo.image_url}
                    onChange={(value) =>
                      setImageInfo({ ...imageInfo, image_url: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Image Alt</td>
                <td className="py-1">
                  <MyInput
                    value={imageInfo.image_alt}
                    onChange={(value) =>
                      setImageInfo({ ...imageInfo, image_alt: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Width</td>
                <td className="py-1">
                  <MyInput
                    value={imageInfo.width}
                    onChange={(value) =>
                      setImageInfo({ ...imageInfo, width: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Height</td>
                <td className="py-1">
                  <MyInput
                    value={imageInfo.height}
                    onChange={(value) =>
                      setImageInfo({ ...imageInfo, height: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          <p className="font-semibold mt-4">Twitter Information</p>
          <table className="w-full">
            <tbody>
              <tr className="border-y">
                <td className="py-1 max-w-40">Card Type</td>
                <td className="py-1">
                  <MySelect
                    value={twitter.card_type}
                    onChange={(value) =>
                      setTwitter({ ...twitter, card_type: value })
                    }
                    sizing="md"
                  >
                    {TWITTER_CARD_TYPES.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </MySelect>
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Site Account</td>
                <td className="py-1">
                  <MyInput
                    value={twitter.site_account}
                    onChange={(value) =>
                      setTwitter({ ...twitter, site_account: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
              <tr className="border-b">
                <td className="py-1 max-w-40">Creator Account</td>
                <td className="py-1">
                  <MyInput
                    value={twitter.creator_account}
                    onChange={(value) =>
                      setTwitter({ ...twitter, creator_account: value })
                    }
                    className="w-full"
                  />
                </td>
              </tr>
            </tbody>
          </table>

          {pageType === "article" && (
            <>
              <p className="font-semibold mt-4">Article Information</p>
              <table className="w-full">
                <tbody>
                  <tr className="border-y">
                    <td className="py-1 max-w-40">Published Date</td>
                    <td className="py-1">
                      <MyInput
                        value={article.published_date}
                        onChange={(value) =>
                          setArticle({ ...article, published_date: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Modified Date</td>
                    <td className="py-1">
                      <MyInput
                        value={article.modified_date}
                        onChange={(value) =>
                          setArticle({ ...article, modified_date: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Expiration Date</td>
                    <td className="py-1">
                      <MyInput
                        value={article.expiration_date}
                        onChange={(value) =>
                          setArticle({ ...article, expiration_date: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Author</td>
                    <td className="py-1">
                      <MyInput
                        value={article.author}
                        onChange={(value) =>
                          setArticle({ ...article, author: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Section</td>
                    <td className="py-1">
                      <MyInput
                        value={article.section}
                        onChange={(value) =>
                          setArticle({ ...article, section: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Tag</td>
                    <td className="py-1">
                      <MyInput
                        value={article.tag}
                        onChange={(value) =>
                          setArticle({ ...article, tag: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {pageType === "book" && (
            <>
              <p className="font-semibold mt-4">Book Information</p>
              <table className="w-full">
                <tbody>
                  <tr className="border-y">
                    <td className="py-1 max-w-40">Author</td>
                    <td className="py-1">
                      <MyInput
                        value={book.author}
                        onChange={(value) =>
                          setBook({ ...book, author: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">ISBN</td>
                    <td className="py-1">
                      <MyInput
                        value={book.isbn}
                        onChange={(value) => setBook({ ...book, isbn: value })}
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Release Date</td>
                    <td className="py-1">
                      <MyInput
                        value={book.release_date}
                        onChange={(value) =>
                          setBook({ ...book, release_date: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Tag</td>
                    <td className="py-1">
                      <MyInput
                        value={book.tag}
                        onChange={(value) => setBook({ ...book, tag: value })}
                        className="w-full"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}

          {pageType === "profile" && (
            <>
              <p className="font-semibold mt-4">Profile Information</p>
              <table className="w-full">
                <tbody>
                  <tr className="border-y">
                    <td className="py-1 max-w-40">First Name</td>
                    <td className="py-1">
                      <MyInput
                        value={profile.first_name}
                        onChange={(value) =>
                          setProfile({ ...profile, first_name: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Last Name</td>
                    <td className="py-1">
                      <MyInput
                        value={profile.last_name}
                        onChange={(value) =>
                          setProfile({ ...profile, last_name: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Username</td>
                    <td className="py-1">
                      <MyInput
                        value={profile.username}
                        onChange={(value) =>
                          setProfile({ ...profile, username: value })
                        }
                        className="w-full"
                      />
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-1 max-w-40">Gender</td>
                    <td className="py-1">
                      <MySelect
                        value={profile.gender}
                        onChange={(value) =>
                          setProfile({ ...profile, gender: value })
                        }
                        sizing="md"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </MySelect>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </TwoColumn.Left>
      <TwoColumn.Right>
        <MyCard.Header title="Output" helper="Generated Open Graph meta tags" />

        <MyCodeEditor
          value={output}
          onChange={setOutput}
          className="h-full"
          language="html"
          options={{
            readOnly: true,
            minimap: { enabled: false },
          }}
        />
      </TwoColumn.Right>
    </TwoColumn>
  );
};

export default OpenGraphMetaGenerator;
