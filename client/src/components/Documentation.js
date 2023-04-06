import React from "react";
import "./Documentation.css";

class Documentation extends React.Component {
  render() {
    return (
      <div>
        <h4 className="ui horizontal divider header docHeader">
          Documentation
        </h4>
        <h2> Endpoints </h2>
        <p> examples of endpoints to search for kanji. </p>
        <div className="ui segment">
          <div className="ui vertical segment">
            <div className="ui two column very relaxed grid">
              <div className="column endpoint colheader">
                <p>Endpoint</p>
              </div>
              <div className="column endpoint colheader">
                <p>Description</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui two column very relaxed grid">
              <div className="column endpoint">
                <p>/api/kanjisearch/</p>
              </div>
              <div className="column endpoint">
                <p>Search for kanjis by kanji characters</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui two column very relaxed grid">
              <div className="column endpoint">
                <p>/api/meaning/</p>
              </div>
              <div className="column endpoint">
                <p>Search kanji by English meaning</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui two column very relaxed grid">
              <div className="column endpoint">
                <p>/api/list/jouyou/</p>
              </div>
              <div className="column endpoint">
                <p>list all jouyou kanji characters</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui two column very relaxed grid">
              <div className="column endpoint">
                <p>/api/list/jlpt/</p>
              </div>
              <div className="column endpoint">
                <p>List all JLPT kanji characters</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui two column very relaxed grid">
              <div className="column endpoint">
                <p>/api/list/jouyou/&#123;(1-9)&#125;</p>
              </div>
              <div className="column endpoint">
                <p>list all jouyou kanji characters.</p>
                <p>grade 1-6 is jouyou kyouiku.</p>
                <p>kanji grade 8 is kanji taught in secondary school.</p>
                <p>9 indicates it is a Jinmeiyou</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui two column very relaxed grid">
              <div className="column endpoint">
                <p>/api/list/jlpt/</p>
              </div>
              <div className="column endpoint">
                <p>List kanji characters JLPT N&#123;(1-4)&#125;</p>
                <p>The JLPT N level of the kanji from pre 2009 jlpt format</p>
              </div>
            </div>
            <div className="ui divider"></div>
          </div>
        </div>

        <h2> Response </h2>
        <p> All endpoints return a repsonse in the same format. </p>
        <div className="ui segment">
          <div className="ui vertical segment">
            <div className="ui three column very relaxed grid">
              <div className="column colheader">
                <p>FieldName</p>
              </div>
              <div className="column colheader">
                <p>Type</p>
              </div>
              <div className="column colheader">
                <p>Description</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>kanji</p>
              </div>
              <div className="column">
                <p>String</p>
              </div>
              <div className="column">
                <p>The kanji character</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>unicode</p>
              </div>
              <div className="column">
                <p>string</p>
              </div>
              <div className="column">
                <p>unicode of the kanji character</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>grade</p>
              </div>
              <div className="column">
                <p>int</p>
              </div>
              <div className="column">
                <p>This is the jouyou grade of the kanji.</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>stroke_count</p>
              </div>
              <div className="column">
                <p>int</p>
              </div>
              <div className="column">
                <p>Stroke count for the kanji.</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>freq</p>
              </div>
              <div className="column">
                <p>int</p>
              </div>
              <div className="column">
                <p>How frequent the kanji appears in real world.</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>jlpt</p>
              </div>
              <div className="column">
                <p>int</p>
              </div>
              <div className="column">
                <p>The JLPT N level of the kanji from pre 2009 jlpt format</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>heisig</p>
              </div>
              <div className="column">
                <p>int</p>
              </div>
              <div className="column">
                <p>When the number appears in Heisig's remembering the kanji</p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>meanings</p>
              </div>
              <div className="column">
                <p>Object &#123; lang: String[] &#125;</p>
              </div>
              <div className="column">
                <p>The meaning of the kanji in various languages. </p>
              </div>
            </div>
            <div className="ui divider"></div>
            <div className="ui three column very relaxed grid">
              <div className="column">
                <p>readings</p>
              </div>
              <div className="column">
                <p>&#123; lang: String[] &#125;</p>
              </div>
              <div className="column">
                <p>The readings of the kanji. Includes Onyomi and Kunyomi</p>
              </div>
            </div>
          </div>
        </div>

        <h4 className="ui horizontal divider header">Divider</h4>
      </div>
    );
  }
}

export default Documentation;
