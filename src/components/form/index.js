import "./form.scss";
import copy from 'copy-to-clipboard';
import tippy from 'tippy.js';

export default {
  init: function () {
    this.setupForm();
  },

  setupForm: function () {
    const _this = this;
    const form = document.querySelector('.js-signature-form');
    const resultEl = document.querySelector('.js-signature-result');
    const downloadButton = document.querySelector('.js-signature-download');
    const copyButton = document.querySelector('.js-signature-copy');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      const params = {
        name: form.querySelector('input[name="name"]').value.trim(),
        position: form.querySelector('input[name="position"]').value.trim(),
        photo: _this.processPhotoUrl(form.querySelector('input[name="photo"]').value.trim()),
      };

      const signature = _this.loadSignature(params);

      _this.writeIframe(resultEl, signature);
      _this.writeCodeSection(signature);
      
      if (downloadButton.classList.contains('d-none')) {
        _this.copyToClipboard(copyButton, signature);
        downloadButton.href = _this.encodedHtml(resultEl);
        downloadButton.classList.remove('d-none');
      }
    });
  },

  processPhotoUrl: function (value) {
    if (value.includes('drive.google')) {
      const link = value.split('/');
      const idIndex = link[0].includes('https') || link[0].includes('http') ? 5 : 3;
      return `https://lh3.googleusercontent.com/d/${link[idIndex]}`;
    }

    return value;
  },

  writeIframe: function (iframe, html) {
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
  },

  writeCodeSection: function (signature) {
    const codeSection = document.querySelector('.js-code-section');
    const codeContainer = document.querySelector('.js-code-container');

    codeSection.classList.remove('d-none');
    codeContainer.innerText = signature; 
  },

  copyToClipboard: function (button, signature) {
    button.classList.remove('d-none');
    tippy(button, {
      arrow: true,
      animation: 'fade',
      trigger: 'click',
      content: 'HTML signature copied!',
      onShow(instance) {
        setTimeout(() => {
          instance.hide();
        }, 1000);
      }
    });

    button.addEventListener('click', function (e) {
      e.preventDefault();
      copy(signature);
    });
  },

  encodedHtml: function (iframe) {
    return `data:text/html;charset=UTF-8,${encodeURIComponent(iframe.contentWindow.document.documentElement.outerHTML)}`;
  },

  loadSignature: function ({name, position, photo}) {
    return `<!DOCTYPE html
  PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" style="width: 522px !important; height: 100%;">

<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>

<body yahoo bgcolor="#ffffff">
  <table border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <table border="0" cellpadding="0" cellspacing="0">
          <tbody>
            <tr>
              <td style="vertical-align: top;">
                <img width="44" src="${photo}" alt="Headshot" draggable="false">
              </td>
              <td width="12"></td>
              <td>
                <table border="0" cellpadding="0" cellspacing="0">
                  <tbody>
                    <tr>
                      <td>
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td>
                                <font color="#000F00" face="Verdana" size="1" style="font-size: 18px; font-weight: 700;">
                                  ${name}
                                </font>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <font color="#909090" face="Verdana" size="1" style="font-size: 14px;  white-space: nowrap;">
                                  ${position}
                                </font>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td width="100"></td>
                      <td style="vertical-align: top;">
                        <img src="${window.location.origin}/assets/logo.gif" alt="Leafwell" width="138">
                      </td>
                    </tr>
                    <tr>
                      <td height="22"></td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <font color="#000F00" face="Verdana" size="1" style="font-size: 12px; white-space: nowrap;">
                          Unlocking the therapeutic potential of cannabis.
                        </font>
                      </td>
                      <td style="text-align: right;">
                        <a href="http://leafwell.com/" target="_blank">
                          <font color="#000F00" face="Verdana" size="1" style="font-size: 12px; text-decoration: underline;">
                            leafwell.com
                          </font>
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td height="5"></td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <table border="0" cellpadding="0" cellspacing="0">
                          <tbody>
                            <tr>
                              <td>
                                <a href="https://www.facebook.com/leafwellofficial" target="_blank">
                                  <img src="${window.location.origin}/assets/fb.png" alt="Facebook">
                                </a>
                              </td>
                              <td width="15"></td>
                              <td colspan="2">
                                <a href="https://www.instagram.com/leafwell_official/" target="_blank">
                                  <img src="${window.location.origin}/assets/ig.png" alt="Instagram">
                                </a>
                              </td>
                              <td width="15"></td>
                              <td colspan="2">
                                <a href="https://www.linkedin.com/company/leafwellofficial/" target="_blank">
                                  <img src="${window.location.origin}/assets/in.png" alt="LinkedIn">
                                </a>
                              </td>
                              <td width="15"></td>
                              <td colspan="2">
                                <a href="https://twitter.com/_Leafwell_" target="_blank">
                                  <img src="${window.location.origin}/assets/twitter.png" alt="Twitter">
                                </a>
                              </td>
                              <td width="15"></td>
                              <td colspan="2">
                                <a href="https://www.youtube.com/@leafwell" target="_blank">
                                  <img src="${window.location.origin}/assets/yt.png" alt="YouTube">
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                      <td style="text-align: right;">
                        <a href="tel:+1(800)665-2870" target="_blank" style="text-decoration: none;">
                          <font color="#909090" face="Verdana" size="1" style="font-size: 12px;">
                            +1 (888) 665-2870
                          </font>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  },
};
