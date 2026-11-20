import { useEffect, useRef, useState } from "react";
import { HeroLights } from "../HeroLights";
import { HeroSnow } from "../HeroSnow";
import { openSupportChat } from "../openChat";

const assetPathPrefix = "/assets";
const imgWarmHome = `${assetPathPrefix}/0dc8c.png`;
const imgMain = `${assetPathPrefix}/e9911.png`;
const imgWhiteIPhone16EMockupUpperLeftViewLabel = `${assetPathPrefix}/5dbaf.png`;
const imgMarkOfTrustCertifiedIsoiec27001IsmRemovebgPreview = `${assetPathPrefix}/77042.png`;
const imgScopeLogoRemovebgPreview = `${assetPathPrefix}/f1e8c.png`;
const imgVulnerabilityCommitment2024RemovebgPreview = `${assetPathPrefix}/30248.png`;
const imgHomeEnergySwitchIconRemovebgPreview = `${assetPathPrefix}/84f8f.png`;
const imgMarkOfTrustUkasRemovebgPreview = `${assetPathPrefix}/864e1.png`;
const imgOutfoxEnergyFox1348138356222Converted2 = `${assetPathPrefix}/2bc7a.png`;
const imgRectangle20735 = `${assetPathPrefix}/d6913.png`;
const imgSmallFoxInASnowyChristmasScene11 = `${assetPathPrefix}/554b5.png`;
const imgEllipse4 = `${assetPathPrefix}/a9dd4.svg`;
const imgArrowRightAlt = `${assetPathPrefix}/c93b2.svg`;
const imgStar = `${assetPathPrefix}/8793d.svg`;
const imgVector = `${assetPathPrefix}/8a23f.svg`;
const imgEllipse5 = `${assetPathPrefix}/0085e.svg`;
const imgLightning = `${assetPathPrefix}/bc0bb.svg`;
const imgPlus = `${assetPathPrefix}/19a71.svg`;
const imgFire = `${assetPathPrefix}/18f3a.svg`;
const imgGroup1000003091 = `${assetPathPrefix}/d7bed.svg`;
const imgGroup1000003090 = `${assetPathPrefix}/b7552.svg`;
const imgGroup1000003089 = `${assetPathPrefix}/9dea0.svg`;
const imgEllipse3 = `${assetPathPrefix}/9fa6a.svg`;
const imgFrame1000007777 = `${assetPathPrefix}/51d6a.svg`;
const imgFrame1000007778 = `${assetPathPrefix}/68222.svg`;
const imgGroup = `${assetPathPrefix}/a0c51.svg`;
const imgGroup1 = `${assetPathPrefix}/96b13.svg`;
const imgVector1 = `${assetPathPrefix}/72277.svg`;
const imgGroup2 = `${assetPathPrefix}/99f8d.svg`;
const imgVector2 = `${assetPathPrefix}/6a1a8.svg`;
const imgGroup1000003002 = `${assetPathPrefix}/6683b.svg`;
const imgGroup1000003001 = `${assetPathPrefix}/ac5ee.svg`;
const imgGroup3 = `${assetPathPrefix}/eb41a.svg`;
const imgGroup33621 = `${assetPathPrefix}/a4347.svg`;
const imgGroup4 = `${assetPathPrefix}/4f576.svg`;
const imgGroup5 = `${assetPathPrefix}/7ace9.svg`;
const imgDivider = `${assetPathPrefix}/0b256.svg`;
const imgOutfoxEnergySecondaryLogo2ColRgb1 = `${assetPathPrefix}/5d1c5.svg`;
const imgFrame1597881748 = `${assetPathPrefix}/12fe5.svg`;
const imgYoutubeIcon = `${assetPathPrefix}/18d5a.svg`;
const imgTwitter = `${assetPathPrefix}/df110.svg`;
const imgInstagram = `${assetPathPrefix}/deb15.svg`;
const imgInstagram1 = `${assetPathPrefix}/f06aa.svg`;
const imgDivider1 = `${assetPathPrefix}/64ad2.svg`;
const imgFeatherIconsFiGlobe = `${assetPathPrefix}/60e5c.svg`;
const imgFeatherIconsFiMapPin = `${assetPathPrefix}/c43f5.svg`;
const imgDivider2 = `${assetPathPrefix}/8d5dd.svg`;
const imgDivider3 = `${assetPathPrefix}/83dfd.svg`;
const imgDivider4 = `${assetPathPrefix}/eb54a.svg`;
const imgEllipse6 = `${assetPathPrefix}/2713b.svg`;
const imgVector3 = `${assetPathPrefix}/1e83d.svg`;
const imgVector4 = `${assetPathPrefix}/bd391.svg`;
const imgGroup6 = `${assetPathPrefix}/29c82.svg`;
const imgGroup7 = `${assetPathPrefix}/dbfc0.svg`;
const imgGroup1000003023 = `${assetPathPrefix}/c636b.svg`;
const imgGroup1000003028 = `${assetPathPrefix}/0322f.svg`;
const imgOutfoxEnergyPrimaryLogo2ColRgb2 = `${assetPathPrefix}/95087.svg`;
const imgGroup33383 = `${assetPathPrefix}/69c56.svg`;
const imgOutfoxEnergySecondaryLogo2ColRgb2 = `${assetPathPrefix}/58d14.svg`;
const imgArrowForwardIos = `${assetPathPrefix}/67fba.svg`;
const imgArrowForwardIos1 = `${assetPathPrefix}/e88be.svg`;

export default function Option5() {
  const [helpMenuOpen, setHelpMenuOpen] = useState(false);
  const helpMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!helpMenuOpen) return;

    function closeOnOutsideClick(event: MouseEvent) {
      if (!helpMenuRef.current?.contains(event.target as Node)) setHelpMenuOpen(false);
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setHelpMenuOpen(false);
    }

    document.addEventListener("click", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [helpMenuOpen]);

  return (
    <div className="bg-white relative size-full" data-node-id="9:8542" data-name="Option 5">
      <div className="absolute left-[-413px] size-[934px] top-[1969px]" data-node-id="9:8543">
        <div className="absolute inset-[-0.11%_-1.93%_-2.03%_-0.11%]">
          <img alt="" className="block max-w-none size-full" src={imgEllipse4} />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col gap-[100px] items-center left-px top-[880px] w-[1438px]" data-node-id="9:8544">
        <div className="absolute bg-[var(--purple-100,#f1e5fe)] left-[1280px] overflow-clip rounded-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.08)] size-[60px] top-[724px]" data-node-id="9:8545">
          <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-node-id="9:8546" data-name="arrow_right_alt">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowRightAlt} />
          </div>
        </div>
        <div className="absolute flex items-center justify-center left-[104px] size-[60px] top-[724px]" data-node-id="9:8549">
          <div className="flex-none rotate-180">
            <div className="bg-[var(--purple-100,#f1e5fe)] overflow-clip relative rounded-[100px] shadow-[0px_0px_0px_0px_rgba(0,0,0,0.08)] size-[60px]">
              <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[24px] top-1/2" data-node-id="9:8550" data-name="arrow_right_alt">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgArrowRightAlt} />
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex flex-col gap-[56px] items-center relative shrink-0 w-[1278px]" data-node-id="9:8553">
          <p className="[word-break:break-word] font-['Mundial:Bold'] leading-[normal] not-italic relative shrink-0 text-[#7100f1] text-[48px] text-center w-[819px]" data-node-id="9:8554">
            Join the thousands of customers paying less for their energy
          </p>
          <div className="content-stretch flex gap-[16px] items-center relative shrink-0 w-full" data-node-id="9:8555">
            <div className="bg-[var(--purple-1000,#7100f1)] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0" data-node-id="9:8556">
              <div className="content-stretch flex gap-[2.114px] items-center relative shrink-0 w-full" data-node-id="9:8557">
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8558" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8560" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8562" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8564" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8566">
                  <div className="absolute contents left-0 top-0" data-node-id="9:8567">
                    <div className="absolute bg-[#50b482] h-[16.909px] left-0 top-0 w-[8.455px]" data-node-id="9:8568" />
                    <div className="absolute bg-[#50b482] h-[16.909px] left-[8.45px] top-0 w-[8.455px]" data-node-id="9:8569" />
                  </div>
                  <div className="absolute h-[8.375px] left-[4.23px] top-[4.23px] w-[8.807px]" data-node-id="9:8570" data-name="Vector">
                    <div className="absolute inset-[-4.21%_-4%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="9:8571">
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[1.014] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="9:8572">
                  Request For Refund
                </p>
                <div className="content-stretch flex flex-col h-[52px] items-start relative shrink-0 w-[259px]" data-node-id="9:8573">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] h-[77px] leading-[25.888px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="9:8574">
                    Lorem Ipsum is simply dummy text of the printing and typesetting...
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[0] not-italic relative shrink-0 text-[#d7b5fe] text-[16px] w-full" data-node-id="9:8575">
                <span className="leading-[20px] text-white">Kerry Mathews</span>
                <span className="leading-[20px] text-[#cfcfcf]">,</span>
                <span className="leading-[20px] text-[#c592ff]">{` `}</span>
                <span className="leading-[20px] text-[#aeaeae]">12 hours ago</span>
              </p>
            </div>
            <div className="-translate-y-1/2 absolute left-[211px] size-[193px] top-[calc(50%+0.05px)]" data-node-id="9:8576">
              <div className="absolute inset-[-0.52%_40.67%_-9.84%_-0.52%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5} />
              </div>
            </div>
            <div className="bg-[var(--purple-1000,#7100f1)] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0" data-node-id="9:8577">
              <div className="content-stretch flex gap-[2.114px] items-center relative shrink-0 w-full" data-node-id="9:8578">
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8579" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8581" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8583" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8585" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8587">
                  <div className="absolute contents left-0 top-0" data-node-id="9:8588">
                    <div className="absolute bg-[#50b482] h-[16.909px] left-0 top-0 w-[8.455px]" data-node-id="9:8589" />
                    <div className="absolute bg-[#50b482] h-[16.909px] left-[8.45px] top-0 w-[8.455px]" data-node-id="9:8590" />
                  </div>
                  <div className="absolute h-[8.375px] left-[4.23px] top-[4.23px] w-[8.807px]" data-node-id="9:8591" data-name="Vector">
                    <div className="absolute inset-[-4.21%_-4%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="9:8592">
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[1.014] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="9:8593">
                  Request For Refund
                </p>
                <div className="content-stretch flex flex-col h-[52px] items-start relative shrink-0 w-[259px]" data-node-id="9:8594">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] h-[77px] leading-[25.888px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="9:8595">
                    Lorem Ipsum is simply dummy text of the printing and typesetting...
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[0] not-italic relative shrink-0 text-[#d7b5fe] text-[0px] w-full whitespace-pre-wrap" data-node-id="9:8596">
                <span className="leading-[20px] text-[16px] text-white">Kerry Mathews</span>
                <span className="leading-[20px] text-[#c592ff] text-[12px]">{`                             `}</span>
                <span className="font-['Mundial:Light'] leading-[20px] text-[12px] text-white">12 hours ago</span>
              </p>
            </div>
            <div className="bg-[var(--purple-1000,#7100f1)] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0" data-node-id="9:8597">
              <div className="content-stretch flex gap-[2.114px] items-center relative shrink-0 w-full" data-node-id="9:8598">
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8599" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8601" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8603" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8605" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8607">
                  <div className="absolute contents left-0 top-0" data-node-id="9:8608">
                    <div className="absolute bg-[#50b482] h-[16.909px] left-0 top-0 w-[8.455px]" data-node-id="9:8609" />
                    <div className="absolute bg-[#50b482] h-[16.909px] left-[8.45px] top-0 w-[8.455px]" data-node-id="9:8610" />
                  </div>
                  <div className="absolute h-[8.375px] left-[4.23px] top-[4.23px] w-[8.807px]" data-node-id="9:8611" data-name="Vector">
                    <div className="absolute inset-[-4.21%_-4%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="9:8612">
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[1.014] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="9:8613">
                  Request For Refund
                </p>
                <div className="content-stretch flex flex-col h-[52px] items-start relative shrink-0 w-[259px]" data-node-id="9:8614">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] h-[77px] leading-[25.888px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="9:8615">
                    Lorem Ipsum is simply dummy text of the printing and typesetting...
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[0] not-italic relative shrink-0 text-[#d7b5fe] text-[16px] w-full" data-node-id="9:8616">
                <span className="leading-[20px] text-white">Kerry Mathews</span>
                <span className="leading-[20px] text-[#cfcfcf]">,</span>
                <span className="leading-[20px] text-[#c592ff]">{` `}</span>
                <span className="leading-[20px] text-[#aeaeae]">12 hours ago</span>
              </p>
            </div>
            <div className="bg-[var(--purple-1000,#7100f1)] content-stretch flex flex-col gap-[24px] items-start p-[24px] relative rounded-[16px] shrink-0" data-node-id="9:8617">
              <div className="content-stretch flex gap-[2.114px] items-center relative shrink-0 w-full" data-node-id="9:8618">
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8619" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8621" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8623" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8625" data-name="star">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgStar} />
                </div>
                <div className="relative shrink-0 size-[16.909px]" data-node-id="9:8627">
                  <div className="absolute contents left-0 top-0" data-node-id="9:8628">
                    <div className="absolute bg-[#50b482] h-[16.909px] left-0 top-0 w-[8.455px]" data-node-id="9:8629" />
                    <div className="absolute bg-[#50b482] h-[16.909px] left-[8.45px] top-0 w-[8.455px]" data-node-id="9:8630" />
                  </div>
                  <div className="absolute h-[8.375px] left-[4.23px] top-[4.23px] w-[8.807px]" data-node-id="9:8631" data-name="Vector">
                    <div className="absolute inset-[-4.21%_-4%]">
                      <img alt="" className="block max-w-none size-full" src={imgVector} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-node-id="9:8632">
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[1.014] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="9:8633">
                  Request For Refund
                </p>
                <div className="content-stretch flex flex-col h-[52px] items-start relative shrink-0 w-[259px]" data-node-id="9:8634">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] h-[77px] leading-[25.888px] not-italic relative shrink-0 text-[16px] text-white w-full" data-node-id="9:8635">
                    Lorem Ipsum is simply dummy text of the printing and typesetting...
                  </p>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[0] not-italic relative shrink-0 text-[#d7b5fe] text-[16px] w-full" data-node-id="9:8636">
                <span className="leading-[20px] text-white">Kerry Mathews</span>
                <span className="leading-[20px] text-[#cfcfcf]">,</span>
                <span className="leading-[20px] text-[#c592ff]">{` `}</span>
                <span className="leading-[20px] text-[#aeaeae]">12 hours ago</span>
              </p>
            </div>
            <div className="-translate-y-1/2 absolute left-[533px] size-[193px] top-[calc(50%+0.05px)]" data-node-id="9:8637">
              <div className="absolute inset-[-0.52%_40.67%_-9.84%_-0.52%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5} />
              </div>
            </div>
            <div className="-translate-y-1/2 absolute left-[857px] size-[193px] top-[calc(50%+0.05px)]" data-node-id="9:8638">
              <div className="absolute inset-[-0.52%_40.67%_-9.84%_-0.52%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5} />
              </div>
            </div>
            <div className="-translate-y-1/2 absolute left-[1179px] size-[193px] top-[calc(50%+0.05px)]" data-node-id="9:8639">
              <div className="absolute inset-[-0.52%_40.67%_-9.84%_-0.52%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse5} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[1219px] left-[-9px] top-[1357px] w-[1441px]" data-node-id="9:8792">
        <div className="-translate-x-1/2 absolute content-stretch flex flex-col gap-[56px] items-center left-[calc(50%+8.5px)] top-0 w-[1296px]" data-node-id="9:8793">
          <div className="content-stretch flex flex-col items-center relative shrink-0 w-[851px]" data-node-id="9:8794">
            <p className="[word-break:break-word] font-['Mundial:Bold'] leading-[normal] not-italic relative shrink-0 text-[#7100f1] text-[48px] text-center w-full" data-node-id="9:8795">
              Our most popular tariffs
            </p>
          </div>
          <div className="content-stretch flex gap-[16px] items-center leading-[0] relative shrink-0 w-full" data-node-id="9:8796">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:8797">
              <div className="bg-white col-1 h-[314px] ml-0 mt-[26px] overflow-clip relative rounded-[16px] row-1 shadow-[0px_4px_40px_0px_rgba(113,0,241,0.1)] w-[312px]" data-node-id="9:8798">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col font-['Mundial:Demibold'] gap-[16px] items-center left-1/2 not-italic text-center top-[calc(50%-21px)] w-[256px]" data-node-id="9:8799">
                  <p className="leading-[normal] relative shrink-0 text-[20px] text-[color:var(--helping-text,#666)] w-full" data-node-id="9:8800">
                    2-year Fixed Dual Fuel
                  </p>
                  <p className="leading-[0] relative shrink-0 text-[0px] text-[color:var(--purple-1000,#7100f1)] w-full" data-node-id="9:8801">
                    <span className="leading-[normal] text-[48px]">£ 157.15</span>
                    <span className="leading-[normal] text-[18px] text-[color:var(--helping-text,#666)]">/month</span>
                  </p>
                </div>
                <div className="-translate-x-1/2 absolute bg-[var(--purple-1000,#7100f1)] content-stretch flex h-[48px] items-center justify-center left-1/2 px-[32px] py-[12px] rounded-[16px] top-[242px] w-[262px]" data-node-id="9:8802">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--white,white)] whitespace-nowrap" data-node-id="9:8803">
                    Get Started
                  </p>
                </div>
              </div>
              <div className="bg-[var(--purple-100,#f1e5fe)] col-1 content-stretch flex flex-col items-start ml-[70px] mt-0 px-[32px] py-[16px] relative rounded-[16px] row-1" data-node-id="9:8804">
                <div className="content-stretch flex gap-[10.7px] items-center relative shrink-0 w-[107px]" data-node-id="9:8805">
                  <div className="relative shrink-0 size-[32.1px]" data-node-id="9:8806" data-name="Lightning">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLightning} />
                  </div>
                  <div className="relative shrink-0 size-[21.4px]" data-node-id="9:8808" data-name="Plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <div className="relative shrink-0 size-[32.1px]" data-node-id="9:8810" data-name="Fire">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFire} />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:8812">
              <div className="bg-white col-1 h-[314px] ml-0 mt-[26px] overflow-clip relative rounded-[16px] row-1 shadow-[0px_4px_40px_0px_rgba(113,0,241,0.1)] w-[312px]" data-node-id="9:8813">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col font-['Mundial:Demibold'] gap-[16px] items-center left-1/2 not-italic text-center top-[calc(50%-21px)] w-[256px]" data-node-id="9:8814">
                  <p className="leading-[normal] relative shrink-0 text-[20px] text-[color:var(--helping-text,#666)] whitespace-nowrap" data-node-id="9:8815">
                    1-year Fixed Dual Fuel
                  </p>
                  <p className="leading-[0] min-w-full relative shrink-0 text-[0px] text-[color:var(--purple-1000,#7100f1)] w-[min-content]" data-node-id="9:8816">
                    <span className="leading-[normal] text-[48px]">{`£ `}</span>
                    <span className="leading-[normal] text-[48px]">127.20</span>
                    <span className="leading-[normal] text-[18px] text-[color:var(--helping-text,#666)]">/month</span>
                  </p>
                </div>
                <div className="-translate-x-1/2 absolute bg-[var(--purple-1000,#7100f1)] content-stretch flex h-[48px] items-center justify-center left-1/2 px-[32px] py-[12px] rounded-[16px] top-[242px] w-[262px]" data-node-id="9:8817">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--white,white)] whitespace-nowrap" data-node-id="9:8818">
                    Get Started
                  </p>
                </div>
              </div>
              <div className="bg-[var(--purple-100,#f1e5fe)] col-1 content-stretch flex flex-col items-start ml-[70px] mt-0 px-[32px] py-[16px] relative rounded-[16px] row-1" data-node-id="9:8819">
                <div className="content-stretch flex gap-[10.7px] items-center relative shrink-0 w-[107px]" data-node-id="9:8820">
                  <div className="relative shrink-0 size-[32.1px]" data-node-id="9:8821" data-name="Lightning">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLightning} />
                  </div>
                  <div className="relative shrink-0 size-[21.4px]" data-node-id="9:8823" data-name="Plus">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgPlus} />
                  </div>
                  <div className="relative shrink-0 size-[32.1px]" data-node-id="9:8825" data-name="Fire">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFire} />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:8827">
              <div className="bg-white col-1 h-[314px] ml-0 mt-[26px] overflow-clip relative rounded-[16px] row-1 shadow-[0px_4px_40px_0px_rgba(113,0,241,0.1)] w-[312px]" data-node-id="9:8828">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col font-['Mundial:Demibold'] gap-[16px] items-center left-1/2 not-italic text-center top-[calc(50%-21px)] w-[256px]" data-node-id="9:8829">
                  <p className="leading-[normal] relative shrink-0 text-[18px] text-[color:var(--helping-text,#666)] w-full" data-node-id="9:8830">
                    2-year Fixed Electricity
                  </p>
                  <p className="leading-[0] relative shrink-0 text-[0px] text-[color:var(--purple-1000,#7100f1)] w-full" data-node-id="9:8831">
                    <span className="leading-[normal] text-[48px]">£ 62.51</span>
                    <span className="leading-[normal] text-[18px] text-[color:var(--helping-text,#666)]">/month</span>
                  </p>
                </div>
                <div className="-translate-x-1/2 absolute bg-[var(--purple-1000,#7100f1)] content-stretch flex h-[48px] items-center justify-center left-1/2 px-[32px] py-[12px] rounded-[16px] top-[242px] w-[262px]" data-node-id="9:8832">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--white,white)] whitespace-nowrap" data-node-id="9:8833">
                    Get Started
                  </p>
                </div>
              </div>
              <div className="bg-[#f1e5fe] col-1 content-stretch flex flex-col items-start ml-[70px] mt-0 px-[32px] py-[16px] relative rounded-[16px] row-1 w-[171px]" data-node-id="9:8834">
                <div className="content-stretch flex items-center justify-center relative shrink-0 w-[107px]" data-node-id="9:8835">
                  <div className="relative shrink-0 size-[32.1px]" data-node-id="9:8836" data-name="Lightning">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLightning} />
                  </div>
                </div>
              </div>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:8838">
              <div className="bg-white col-1 h-[314px] ml-0 mt-[26px] overflow-clip relative rounded-[16px] row-1 shadow-[0px_4px_40px_0px_rgba(113,0,241,0.1)] w-[312px]" data-node-id="9:8839">
                <div className="-translate-x-1/2 -translate-y-1/2 [word-break:break-word] absolute content-stretch flex flex-col font-['Mundial:Demibold'] gap-[16px] items-center left-1/2 not-italic text-center top-[calc(50%-21px)] w-[256px]" data-node-id="9:8840">
                  <p className="leading-[normal] relative shrink-0 text-[18px] text-[color:var(--helping-text,#666)] w-full" data-node-id="9:8841">
                    1-year Fixed Electricity
                  </p>
                  <p className="leading-[0] relative shrink-0 text-[0px] text-[color:var(--purple-1000,#7100f1)] w-full" data-node-id="9:8842">
                    <span className="leading-[normal] text-[48px]">£ 78.74</span>
                    <span className="leading-[normal] text-[18px] text-[color:var(--helping-text,#666)]">/month</span>
                  </p>
                </div>
                <div className="-translate-x-1/2 absolute bg-[var(--purple-1000,#7100f1)] content-stretch flex h-[48px] items-center justify-center left-1/2 px-[32px] py-[12px] rounded-[16px] top-[242px] w-[262px]" data-node-id="9:8843">
                  <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--white,white)] whitespace-nowrap" data-node-id="9:8844">
                    Get Started
                  </p>
                </div>
              </div>
              <div className="bg-[#f1e5fe] col-1 content-stretch flex flex-col items-start ml-[70px] mt-0 px-[32px] py-[16px] relative rounded-[16px] row-1 w-[171px]" data-node-id="9:8845">
                <div className="content-stretch flex items-center justify-center relative shrink-0 w-[107px]" data-node-id="9:8846">
                  <div className="relative shrink-0 size-[32.1px]" data-node-id="9:8847" data-name="Lightning">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgLightning} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="[word-break:break-word] font-['Mundial:Demibold'] leading-[normal] not-italic relative shrink-0 text-[18px] text-[color:var(--helping-text,#666)] text-center w-[918px]" data-node-id="9:8849">{`*Prices are based on Ofgem’s national Typical Domestic Consumption Values for medium energy use (2,700 kWh electricity and 11,500 kWh gas per year) `}</p>
          <div className="bg-[var(--white,white)] border-[0.5px] border-[var(--black-200,#ccd2d4)] border-solid content-stretch drop-shadow-[4px_4px_8px_rgba(113,0,241,0.2)] flex items-start justify-between p-[24px] relative rounded-[16px] shrink-0 w-[1296px]" data-node-id="9:8850">
            <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-node-id="9:8851">
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start not-italic relative shrink-0 w-full" data-node-id="9:8852">
                <p className="font-['Mundial:Demibold'] leading-[38px] min-w-full relative shrink-0 text-[32px] text-[color:var(--purple-1000,#7100f1)] w-[min-content]" data-node-id="9:8853">
                  Warm Home Discount
                </p>
                <div className="content-stretch flex flex-col font-['Mundial:Regular'] gap-[8px] items-start leading-[19px] relative shrink-0 text-[16px] text-[color:var(--black-600,#66787e)] w-[867px]" data-node-id="9:8854">
                  <p className="relative shrink-0 w-full" data-node-id="9:8855">
                    If you live in Scotland and do not qualify for the Core Group 1 rebate, you can apply for the Broader Group for Scotland.
                  </p>
                  <p className="relative shrink-0 w-full" data-node-id="9:8856">
                    Check to see if you are eligible and apply today!
                  </p>
                </div>
              </div>
              <div className="bg-[#7100f1] content-stretch flex items-center justify-center px-[24px] py-[16px] relative rounded-[16px] shrink-0" data-node-id="9:8857">
                <p className="[word-break:break-word] font-['Mundial:Demibold'] leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--purple-50,#f5edff)] whitespace-nowrap" data-node-id="9:8858">
                  Apply Today
                </p>
              </div>
              <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[0] not-italic relative shrink-0 text-[14px] text-[color:var(--black-600,#66787e)] text-center whitespace-nowrap" data-node-id="9:8859">
                <span className="leading-[16px]">{`For more information about the Warm Home Discount in England, Wales and Scotland, please click `}</span>
                <span className="[text-decoration-skip-ink:none] decoration-[5.5%] decoration-solid leading-[16px] text-[color:var(--purple-1000,#7100f1)] underline">here</span>
              </p>
            </div>
            <div className="flex-[1_0_0] min-w-px relative self-stretch" data-node-id="9:8860" data-name="Warm home">
              <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWarmHome} />
            </div>
          </div>
        </div>
        <div className="absolute bg-white content-stretch flex items-start left-[73px] overflow-clip pl-[76px] pr-[44px] py-[54px] rounded-[16px] shadow-[0px_4px_40px_0px_rgba(113,0,241,0.1)] top-[848px] w-[1298px]" data-node-id="9:8861">
          <div className="content-stretch flex flex-col gap-[42px] items-center relative shrink-0 w-[1166px]" data-node-id="9:8862">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[7px] items-start relative shrink-0 text-center w-[735px]" data-node-id="9:8863">
              <p className="font-['Wix_Madefor_Display:ExtraBold'] font-extrabold leading-[normal] relative shrink-0 text-[48px] text-[color:var(--purple-1000,#7100f1)] w-full" data-node-id="9:8864">
                Outfox the Price Cap
              </p>
              <p className="font-['Wix_Madefor_Display:Bold'] font-bold leading-[0] relative shrink-0 text-[24px] text-[color:var(--labels---vibrant---controls\/primary-√,#404040)] w-full whitespace-pre-wrap" data-node-id="9:8865">
                <span className="leading-[normal]">{`Always below the price cap. Always in control.   `}</span>
                <span className="[text-underline-position:from-font] decoration-from-font decoration-solid leading-[normal] text-[color:var(--purple-1000,#7100f1)] underline">Learn more</span>
              </p>
            </div>
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="9:8866">
              <div className="bg-[var(--stroke,#e6e9ea)] col-1 content-stretch flex items-center ml-[833px] mt-0 overflow-clip px-[69px] py-[64px] relative rounded-[500px] row-1 size-[280px]" data-node-id="9:8867" data-name="c">
                <div className="h-[127.999px] relative shrink-0 w-[140px]" data-node-id="9:8868">
                  <div className="absolute inset-[-2.84%_-0.56%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup1000003091} />
                  </div>
                </div>
              </div>
              <div className="bg-[var(--stroke,#e6e9ea)] col-1 content-stretch flex items-center ml-[437.5px] mt-0 overflow-clip px-[69px] py-[64px] relative rounded-[500px] row-1 size-[280px]" data-node-id="9:8896" data-name="b">
                <div className="h-[140.139px] relative shrink-0 w-[140.435px]" data-node-id="9:8897">
                  <div className="absolute inset-[0_0_-2.97%_-2.76%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup1000003090} />
                  </div>
                </div>
              </div>
              <div className="bg-[var(--stroke,#e6e9ea)] col-1 content-stretch flex items-center ml-[18.5px] mt-0 overflow-clip px-[69px] py-[64px] relative rounded-[500px] row-1 size-[280px]" data-node-id="9:8917" data-name="a">
                <div className="h-[140.618px] relative shrink-0 w-[140.616px]" data-node-id="9:8918">
                  <div className="absolute inset-[-2.96%]">
                    <img alt="" className="block max-w-none size-full" src={imgGroup1000003089} />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] col-1 font-['Wix_Madefor_Display:Bold'] font-bold h-[69px] leading-[normal] ml-0 mt-[342px] relative row-1 text-[24px] text-[color:var(--labels---vibrant---controls\/primary-√,#404040)] text-center w-[317px]" data-node-id="9:8926">
                Guaranteed to be 5% cheaper than the price cap
              </p>
              <p className="[word-break:break-word] col-1 font-['Wix_Madefor_Display:Bold'] font-bold h-[69px] leading-[normal] ml-[409px] mt-[342px] relative row-1 text-[24px] text-[color:var(--labels---vibrant---controls\/primary-√,#404040)] text-center w-[317px]" data-node-id="9:8927">
                If the price cap drops, your rate drops too.
              </p>
              <p className="[word-break:break-word] col-1 font-['Wix_Madefor_Display:Bold'] font-bold h-[69px] leading-[normal] ml-[815px] mt-[342px] relative row-1 text-[24px] text-[color:var(--labels---vibrant---controls\/primary-√,#404040)] text-center w-[317px]" data-node-id="9:8928">
                Save £100 a year for an average consumer.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[4894px] left-[-331px] top-[2923px] w-[2237px]" data-node-id="9:8929">
        <div className="absolute contents left-0 top-0" data-node-id="9:8930">
          <div className="absolute left-[1303px] size-[934px] top-[3449px]" data-node-id="9:8931">
            <div className="absolute inset-[-0.11%_-1.93%_-2.03%_-0.11%]">
              <img alt="" className="block max-w-none size-full" src={imgEllipse4} />
            </div>
          </div>
          <div className="absolute left-0 size-[934px] top-[2329px]" data-node-id="9:8932">
            <div className="absolute inset-[-0.11%_-1.93%_-2.03%_-0.11%]">
              <img alt="" className="block max-w-none size-full" src={imgEllipse4} />
            </div>
          </div>
          <div className="-translate-x-1/2 absolute h-[577px] left-[calc(50%-68.5px)] overflow-clip top-0 w-[1444px]" data-node-id="9:8933" style={{ backgroundImage: "linear-gradient(181.56408659621297deg, rgb(113, 0, 241) 6.5615%, rgb(0, 30, 40) 104.53%)" }}>
            <div className="absolute left-[809.87px] size-[807px] top-[-186px]" data-node-id="9:8934">
              <div className="absolute inset-[-0.3%_-5.45%_-5.76%_-0.3%]">
                <img alt="" className="block max-w-none size-full" src={imgEllipse3} />
              </div>
            </div>
            <div className="absolute content-stretch flex flex-col gap-[70px] items-start left-[153px] top-[66px] w-[650px]" data-node-id="9:8935">
              <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="9:8936">
                <p className="[word-break:break-word] font-['Mundial:Bold'] leading-[normal] min-w-full not-italic relative shrink-0 text-[48px] text-[color:var(--white,white)] w-[min-content]" data-node-id="9:8937">
                  Do you have an EV?
                </p>
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[30px] not-italic relative shrink-0 text-[24px] text-white w-[569px] whitespace-pre-wrap" data-node-id="9:8938">{`Here's why My EV  is the smart tariff you've been waiting for.`}</p>
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="9:8939">
                  <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-node-id="9:8940">
                    <div className="relative shrink-0 size-[20px]" data-node-id="9:8941">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007777} />
                    </div>
                    <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[24px] text-white whitespace-nowrap" data-node-id="9:8943">{`Exclusive Discounted Rate: Save on overnight charging. `}</p>
                  </div>
                  <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-[673px]" data-node-id="9:8944">
                    <div className="relative shrink-0 size-[20px]" data-node-id="9:8945">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007777} />
                    </div>
                    <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[24px] text-white w-[624px]" data-node-id="9:8947">
                      Eco-Friendly Energy Use: Support greener grids during off-peak hours.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white h-[72px] overflow-clip relative rounded-[48px] shrink-0 w-[240px]" data-node-id="9:8948" data-name="Component 27">
                <div className="absolute left-[173px] size-[60px] top-[6px]" data-node-id="I9:8948;4762:9088">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007778} />
                </div>
                <p className="[word-break:break-word] absolute font-['Mundial:Regular'] leading-[normal] left-[32px] not-italic text-[18px] text-[color:var(--helping-text,#666)] top-[calc(50%-9px)] whitespace-nowrap" data-node-id="I9:8948;4762:9093">
                  Learn More
                </p>
              </div>
            </div>
            <div className="absolute contents left-[672.4px] top-[289px]" data-node-id="9:8949">
              <div className="absolute bg-[var(--black-1000,#001e28)] h-[292px] left-[1188px] rounded-[24px] top-[289px] w-[136px]" data-node-id="9:8950" />
              <div className="absolute contents inset-[60.87%_17.71%_22.27%_77.75%]" data-node-id="9:8951">
                <div className="absolute inset-[60.87%_17.71%_23.56%_77.75%]" data-node-id="9:8952" data-name="Group">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup} />
                </div>
                <div className="absolute inset-[60.87%_17.71%_22.27%_77.75%]" data-node-id="9:8954" data-name="Group">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1} />
                </div>
              </div>
              <div className="absolute inset-[61.71%_9.49%_35.76%_83.51%]" data-node-id="9:8956" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector1} />
              </div>
              <div className="absolute inset-[71.64%_11.46%_21.01%_85.51%]" data-node-id="9:8957" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup2} />
              </div>
              <div className="absolute inset-[50.24%_8.31%_-2.35%_82.26%]" data-node-id="9:8961" data-name="Vector">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector2} />
              </div>
              <div className="absolute flex inset-[74.36%_46.82%_17.21%_48.32%] items-center justify-center" data-node-id="9:8962" style={{ containerType: "size" }}>
                <div className="-scale-x-100 flex-none h-[100cqh] w-[100cqw]">
                  <div className="relative size-full">
                    <div className="absolute inset-[-20.56%_-14.26%]">
                      <img alt="" className="block max-w-none size-full" src={imgGroup1000003002} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-[74.36%_23.98%_17.29%_71.22%]" data-node-id="9:8967">
                <div className="absolute inset-[-518.44%_-360.79%]">
                  <img alt="" className="block max-w-none size-full" src={imgGroup1000003001} />
                </div>
              </div>
              <div className="absolute inset-[55.47%_22.2%_-2.35%_46.56%]" data-node-id="9:8972" data-name="Group">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup3} />
              </div>
            </div>
          </div>
          <div className="absolute bg-[#001e28] content-stretch flex gap-[110px] h-[710px] items-center left-[328px] pl-[142px] pr-[186px] py-[32px] top-[577px] w-[1449px]" data-node-id="9:8989">
            <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="9:8990" data-name="phone">
              <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative row-1" data-node-id="9:9001">
                <div className="col-1 h-[186px] ml-0 mt-0 relative row-1 w-[439px]" data-node-id="9:9002" />
                <div className="[word-break:break-word] col-1 font-['Mundial:Demibold'] ml-[21px] mt-[39px] not-italic relative row-1 text-[48px] text-white w-[439px] whitespace-pre-wrap" data-node-id="9:9003">
                  <p className="leading-[normal] mb-0">{`Cheaper Energy `}</p>
                  <p className="leading-[normal]">on the Go</p>
                </div>
                <p className="[word-break:break-word] col-1 font-['Mundial:Regular'] h-[58px] leading-[101.39500427246094%] ml-[21px] mt-[153px] not-italic relative row-1 text-[16px] text-white w-[390px]" data-node-id="9:9004">{`You're in safe hands. Update meter readings, check your balance and statements with our user-friendly app.`}</p>
                <div className="bg-[#242424] col-1 h-[83px] ml-[5px] mt-[43px] relative row-1 w-[4px]" data-node-id="9:9005" />
                <div className="col-1 content-stretch flex gap-[20px] items-center ml-px mt-[350px] relative row-1" data-node-id="9:9006" data-name="download">
                  <div className="bg-[#242424] border border-solid border-white h-[57px] relative rounded-[60px] shrink-0 w-[199px]" data-node-id="9:9007">
                    <div className="absolute inset-[calc(19.97%-0.6px)_calc(18.09%-0.64px)_calc(21.15%-0.58px)_calc(18.45%-0.63px)]" data-node-id="9:9008">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup33621} />
                    </div>
                  </div>
                  <div className="bg-[#242424] border border-solid border-white h-[57px] relative rounded-[60px] shrink-0 w-[199px]" data-node-id="9:9034">
                    <div className="absolute contents inset-[calc(24.56%-0.51px)_calc(18.09%-0.64px)_calc(23.17%-0.54px)_calc(18.59%-0.63px)]" data-node-id="9:9035">
                      <div className="absolute inset-[25.04%_68.64%_25.48%_18.59%]" data-node-id="9:9036" data-name="Group">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup4} />
                      </div>
                      <div className="absolute inset-[24.56%_18.09%_23.17%_35.58%]" data-node-id="9:9041" data-name="Group">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup5} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-[509.163px] relative shrink-0 w-[422.306px]" data-node-id="9:9059" data-name="White iPhone 16e mockup upper left view">
              <div className="absolute h-[543.782px] left-[8.98px] top-[8.49px] w-[451.02px]" data-node-id="9:9060" data-name="White iPhone 16e mockup upper left view">
                <div className="absolute h-[543.782px] left-0 top-0 w-[451.02px]" data-node-id="9:9061" data-name="main">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMain} />
                </div>
                <div className="absolute h-[509.13px] left-[9.6px] top-[9.06px] w-[417.166px]" data-node-id="9:9062" data-name="White iPhone 16e mockup upper left view label">
                  <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgWhiteIPhone16EMockupUpperLeftViewLabel} />
                </div>
              </div>
            </div>
          </div>
          <div className="absolute h-[2978px] left-[338px] top-[1916px] w-[1441px]" data-node-id="9:9063">
            <div className="-translate-x-1/2 absolute bg-[var(--black-1000,#001e28)] h-[2931px] left-[calc(50%-3.5px)] overflow-clip top-[47px] w-[1448px]" data-node-id="9:9064">
              <div className="absolute content-stretch flex flex-col gap-[56px] items-start left-[91px] top-[58px] w-[789px]" data-node-id="9:9065">
                <div className="content-stretch flex flex-col gap-[32px] items-start relative shrink-0 w-full" data-node-id="9:9066">
                  <div className="content-stretch flex items-center justify-center pr-[32px] py-[24px] relative rounded-br-[48px] rounded-tr-[48px] shrink-0" data-node-id="9:9067">
                    <p className="[word-break:break-word] font-['Mundial:Bold'] leading-[normal] not-italic relative shrink-0 text-[48px] text-[color:var(--purple-500,#b880f8)] w-[559px]" data-node-id="9:9068">
                      Our Customer Service is Officially Excellent!
                    </p>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex flex-col font-['Mundial:Regular'] gap-[24px] items-start leading-[normal] not-italic relative shrink-0 text-[24px] text-[color:var(--white,white)] w-[789px]" data-node-id="9:9069">
                    <p className="relative shrink-0 w-[768px]" data-node-id="9:9070">{`Delivering the best in customer service is our main focus and we're proud to have been reviewed over 40,000 times by our customers.`}</p>
                    <p className="min-w-full relative shrink-0 w-[min-content]" data-node-id="9:9071">
                      Our Excellent rating on Trustpilot is only made possible by our knowledgable and hard working team.
                    </p>
                  </div>
                </div>
                <div className="bg-white h-[72px] overflow-clip relative rounded-[48px] shrink-0 w-[240px]" data-node-id="9:9072" data-name="Component 27">
                  <div className="absolute left-[173px] size-[60px] top-[6px]" data-node-id="I9:9072;4762:9088">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1000007778} />
                  </div>
                  <p className="[word-break:break-word] absolute font-['Mundial:Regular'] leading-[normal] left-[32px] not-italic text-[18px] text-[color:var(--helping-text,#666)] top-[calc(50%-9px)] whitespace-nowrap" data-node-id="I9:9072;4762:9093">
                    Learn More
                  </p>
                </div>
              </div>
              <div className="absolute bg-[var(--purple-100,#f1e5fe)] h-[332px] left-0 overflow-clip top-[622px] w-[1441px]" data-node-id="9:9073">
                <div className="-translate-y-1/2 absolute content-stretch flex flex-col items-center left-[111px] top-[calc(50%+0.5px)] w-[1219px]" data-node-id="9:9074">
                  <div className="content-stretch flex gap-[56px] items-center relative shrink-0 w-full" data-node-id="9:9075">
                    <div className="h-[103px] relative shrink-0 w-[204px]" data-node-id="9:9076" data-name="MarkOfTrustCertified_ISOIEC_27001_ISM-removebg-preview">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMarkOfTrustCertifiedIsoiec27001IsmRemovebgPreview} />
                    </div>
                    <div className="h-[102px] relative shrink-0 w-[162px]" data-node-id="9:9077" data-name="Scope-Logo-removebg-preview">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgScopeLogoRemovebgPreview} />
                    </div>
                    <div className="relative shrink-0 size-[102px]" data-node-id="9:9078" data-name="_Vulnerability-Commitment-2024-removebg-preview">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgVulnerabilityCommitment2024RemovebgPreview} />
                    </div>
                    <div className="h-[103px] relative shrink-0 w-[349px]" data-node-id="9:9079" data-name="Home-Energy-Switch-Icon-removebg-preview">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgHomeEnergySwitchIconRemovebgPreview} />
                    </div>
                    <div className="h-[105px] relative shrink-0 w-[178px]" data-node-id="9:9080" data-name="MarkOfTrust_UKAS-removebg-preview">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgMarkOfTrustUkasRemovebgPreview} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute bg-white content-stretch flex flex-col h-[724px] items-center justify-center left-0 px-[72px] py-[10px] top-[1748px] w-[1441px]" data-node-id="9:9081">
                <div className="bg-[#f1e5fe] content-stretch flex flex-col items-start overflow-clip px-[109px] py-[48px] relative rounded-[32px] shrink-0 w-[1079px]" data-node-id="9:9082">
                  <div className="content-stretch flex flex-col gap-[48px] items-center relative shrink-0 w-full" data-node-id="9:9083">
                    <div className="h-[204px] relative shrink-0 w-[156.275px]" data-node-id="9:9084" data-name="Outfox-Energy-Fox-1348138356-222[Converted] 2">
                      <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgOutfoxEnergyFox1348138356222Converted2} />
                    </div>
                    <div className="content-stretch flex flex-col gap-[48px] items-center justify-center relative shrink-0 w-full" data-node-id="9:9085">
                      <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[normal] not-italic relative shrink-0 text-center w-[687px]" data-node-id="9:9086">
                        <p className="font-['Mundial:Bold'] relative shrink-0 text-[48px] text-[color:var(--purple-1000,#7100f1)] w-full" data-node-id="9:9087">
                          Speak with one of our Advisors
                        </p>
                        <p className="font-['Mundial:Demibold'] relative shrink-0 text-[24px] text-[color:var(--black-1000,#001e28)] w-full" data-node-id="9:9088">
                          Forget long wait times!
                        </p>
                      </div>
                      <div className="[word-break:break-word] content-stretch flex font-['Mundial:Regular'] gap-[16px] h-[24px] items-center justify-center leading-[normal] not-italic relative shrink-0 text-[24px] text-[color:var(--black-1000,#001e28)] w-full whitespace-nowrap" data-node-id="9:9089">
                        <div className="border-[var(--black-1000,#001e28)] border-r border-solid content-stretch flex gap-[16px] items-start justify-center pr-[16px] relative shrink-0" data-node-id="9:9090">
                          <p className="relative shrink-0" data-node-id="9:9091">
                            Monday - Friday
                          </p>
                          <p className="relative shrink-0" data-node-id="9:9092">
                            08:30 - 17:00
                          </p>
                        </div>
                        <div className="border-[var(--black-1000,#001e28)] border-r border-solid content-stretch flex gap-[16px] items-start justify-center pr-[16px] relative shrink-0" data-node-id="9:9093">
                          <p className="relative shrink-0" data-node-id="9:9094">
                            Saturday
                          </p>
                          <p className="relative shrink-0" data-node-id="9:9095">
                            09:00 - 14:00
                          </p>
                        </div>
                        <div className="content-stretch flex gap-[16px] items-start justify-center relative shrink-0 w-[178px]" data-node-id="9:9096">
                          <p className="relative shrink-0" data-node-id="9:9097">
                            Sunday
                          </p>
                          <p className="relative shrink-0" data-node-id="9:9098">
                            Closed
                          </p>
                        </div>
                      </div>
                      <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-node-id="9:9099">
                        <div className="bg-[var(--purple-1000,#7100f1)] content-stretch flex items-center justify-center px-[32px] py-[12px] relative rounded-[16px] shrink-0 w-[256px]" data-node-id="9:9100">
                          <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[24px] text-[color:var(--white,white)] whitespace-nowrap" data-node-id="9:9101">
                            Chat Now
                          </p>
                        </div>
                        <div className="bg-[var(--purple-1000,#7100f1)] content-stretch flex items-center justify-center px-[32px] py-[12px] relative rounded-[16px] shrink-0 w-[256px]" data-node-id="9:9102">
                          <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[24px] text-[color:var(--white,white)] whitespace-nowrap" data-node-id="9:9103">
                            0800 103 2702
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="-translate-x-1/2 absolute bottom-[91px] content-stretch flex flex-col items-start left-[calc(50%-3px)] w-[1440px]" data-node-id="9:9104" data-name="Footer">
                <div className="h-0 relative shrink-0 w-[1440px]" data-node-id="9:9105" data-name="Divider">
                  <div className="absolute inset-[-1px_0_0_0]">
                    <img alt="" className="block max-w-none size-full" src={imgDivider} />
                  </div>
                </div>
                <div className="bg-[var(--purple-1000,#7100f1)] content-stretch flex items-center justify-center px-[80px] py-[32px] relative shrink-0 w-[1439px]" data-node-id="9:9106">
                  <div className="content-stretch flex items-start justify-between relative shrink-0 w-[1280px]" data-node-id="9:9107">
                    <div className="content-stretch flex flex-col gap-[24px] h-[200px] items-start py-[24px] relative shrink-0 w-[386px]" data-node-id="9:9108">
                      <div className="h-[39px] relative shrink-0 w-[224px]" data-node-id="9:9109" data-name="outfox-energy-secondary-logo-2col-rgb 1">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgOutfoxEnergySecondaryLogo2ColRgb1} />
                      </div>
                      <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[321px]" data-node-id="9:9122">
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#f8f6f3] text-[14px] w-[min-content]" data-node-id="9:9123">
                          <p className="leading-[normal]">Follow us on social media</p>
                        </div>
                        <div className="content-stretch cursor-pointer flex items-center justify-between relative shrink-0 w-[236px]" data-node-id="9:9124" data-name="social media">
                          <a className="block overflow-clip relative shrink-0 size-[24px]" href="https://www.facebook.com/Oufox.Energy/" data-node-id="9:9125" target="_blank" data-name="FB">
                            <div className="absolute h-[23.94px] left-[6px] top-0 w-[11.198px]" data-node-id="9:9126">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFrame1597881748} />
                            </div>
                          </a>
                          <a className="block overflow-clip relative shrink-0 size-[24px]" href="https://x.com/outfox_energy" data-node-id="9:9128" target="_blank" data-name="TWITTER">
                            <div className="absolute contents left-0 top-0" data-node-id="9:9129" data-name="Mask group">
                              <div className="absolute bg-[var(--white,white)] h-[22.02px] left-[0.62px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.621px_-0.992px] mask-size-[25.166px_25.164px] top-[0.99px] w-[23.907px]" data-node-id="9:9131" style={{ maskImage: `url("${imgRectangle20735}")` }} />
                            </div>
                          </a>
                          <a className="block h-[19.011px] relative shrink-0 w-[23.94px]" href="https://www.youtube.com/@outfox.energy" data-node-id="9:9132" target="_blank" data-name="Youtube-Icon">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgYoutubeIcon} />
                          </a>
                          <a className="block relative shrink-0 size-[24px]" href="https://www.linkedin.com/company/outfoxenergy/" data-node-id="9:9133" target="_blank" data-name="TWITTER">
                            <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgTwitter} />
                          </a>
                          <a className="block overflow-clip relative shrink-0 size-[24px]" href="https://www.instagram.com/outfox.energy" data-node-id="9:9135" target="_blank" data-name="TWITTER">
                            <div className="absolute contents left-0 top-0" data-node-id="9:9136" data-name="Mask group">
                              <div className="absolute left-[0.63px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.625px_-0.992px] mask-size-[25.166px_25.164px] size-[24.645px] top-[0.99px]" data-node-id="9:9138" style={{ maskImage: `url("${imgRectangle20735}")` }} data-name="Instagram">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgInstagram} />
                              </div>
                            </div>
                          </a>
                          <a className="block overflow-clip relative shrink-0 size-[24px]" href="https://www.tiktok.com/notfound" data-node-id="9:9140" target="_blank" data-name="TWITTER">
                            <div className="absolute contents left-0 top-0" data-node-id="9:9141" data-name="Mask group">
                              <div className="absolute left-[0.63px] mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-0.625px_-0.992px] mask-size-[25.166px_25.164px] size-[24.645px] top-[0.99px]" data-node-id="9:9143" style={{ maskImage: `url("${imgRectangle20735}")` }} data-name="Instagram">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgInstagram1} />
                              </div>
                            </div>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="content-stretch flex gap-[72px] items-start relative shrink-0" data-node-id="9:9145">
                      <div className="content-stretch flex flex-col gap-[100px] items-start relative shrink-0 w-[263px]" data-node-id="9:9146">
                        <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[263px]" data-node-id="9:9147">
                          <div className="content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-[300px]" data-node-id="9:9148" data-name="Consecte">
                            <div className="[word-break:break-word] flex flex-col font-['Mundial:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[16px] whitespace-nowrap" data-node-id="9:9149">
                              <p className="leading-[normal]">Contact</p>
                            </div>
                            <div className="h-0 relative shrink-0 w-[263px]" data-node-id="9:9150" data-name="Divider">
                              <div className="absolute inset-[-0.5px_0_0_0]">
                                <img alt="" className="block max-w-none size-full" src={imgDivider1} />
                              </div>
                            </div>
                          </div>
                          <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[263px]" data-node-id="9:9151">
                            <div className="content-stretch flex gap-[16px] items-center relative shrink-0" data-node-id="9:9152">
                              <div className="relative shrink-0 size-[16px]" data-node-id="9:9153" data-name="Feather Icons/fi:globe">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFeatherIconsFiGlobe} />
                              </div>
                              <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[12px] whitespace-nowrap" data-node-id="9:9154">
                                <p className="leading-[normal]">www.outfox.energy</p>
                              </div>
                            </div>
                            <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-[263px]" data-node-id="9:9155">
                              <div className="relative shrink-0 size-[16px]" data-node-id="9:9156" data-name="Feather Icons/fi:map-pin">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgFeatherIconsFiMapPin} />
                              </div>
                              <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[12px] w-[231px]" data-node-id="9:9157">
                                <p className="leading-[15px] mb-0">Outfox Energy (Foxglove Energy Supply Ltd), 16 North Mills, Frog Island, Leicester, Leicestershire, LE3 5DL, England</p>
                                <p className="leading-[15px] mb-0">Registered in England and Wales with</p>
                                <p className="leading-[15px]">company number 09689035.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="content-stretch flex items-start relative shrink-0 w-[237px]" data-node-id="9:9158">
                          <div className="[word-break:break-word] flex flex-col font-['Acumin_Pro:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[12px] w-[517px]" data-node-id="9:9159">
                            <p>
                              <span className="font-['Mundial:Regular'] leading-[normal]">{`Like most websites, Outfox Energy uses cookies. Read our `}</span>
                              <span className="[text-underline-position:from-font] decoration-from-font decoration-solid font-['Mundial:Bold'] leading-[normal] underline">{`Cookie Policy `}</span>
                              <span className="font-['Mundial:Regular'] leading-[normal]">for more information.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0" data-node-id="9:9160">
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="9:9161" data-name="Consecte">
                          <div className="[word-break:break-word] flex flex-col font-['Mundial:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[16px] whitespace-nowrap" data-node-id="9:9162">
                            <p className="leading-[normal]">Page</p>
                          </div>
                        </div>
                        <div className="h-0 relative shrink-0 w-[132px]" data-node-id="9:9163" data-name="Divider">
                          <div className="absolute inset-[-0.5px_0_0_0]">
                            <img alt="" className="block max-w-none size-full" src={imgDivider2} />
                          </div>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[14px] whitespace-nowrap" data-node-id="9:9164">
                          <p className="leading-[normal]">About Us</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[14px] whitespace-nowrap" data-node-id="9:9165">
                          <p className="leading-[normal]">Help Centre</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[14px] whitespace-nowrap" data-node-id="9:9166">
                          <p className="leading-[normal]">Account</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[14px] whitespace-nowrap" data-node-id="9:9167">
                          <p className="leading-[normal]">Contact us</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#f8f6f3] text-[14px] w-[min-content]" data-node-id="9:9168">
                          <p className="leading-[normal]">Complaints</p>
                        </div>
                      </div>
                      <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[132px]" data-node-id="9:9169">
                        <div className="content-stretch flex flex-col items-start relative shrink-0" data-node-id="9:9170" data-name="Consecte">
                          <div className="[word-break:break-word] flex flex-col font-['Mundial:Bold'] justify-center leading-[0] not-italic relative shrink-0 text-[#f8f6f3] text-[16px] whitespace-nowrap" data-node-id="9:9171">
                            <p className="leading-[normal]">More</p>
                          </div>
                        </div>
                        <div className="h-0 relative shrink-0 w-full" data-node-id="9:9172" data-name="Divider">
                          <div className="absolute inset-[-0.5px_0_0_0]">
                            <img alt="" className="block max-w-none size-full" src={imgDivider3} />
                          </div>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#f8f6f3] text-[14px] w-[min-content]" data-node-id="9:9173">
                          <p className="leading-[normal]">FAQs</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#f8f6f3] text-[14px] w-[min-content]" data-node-id="9:9174">
                          <p className="leading-[normal]">Terms and conditions</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#f8f6f3] text-[14px] w-[min-content]" data-node-id="9:9175">
                          <p className="leading-[normal]">Our policies</p>
                        </div>
                        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#f8f6f3] text-[14px] w-[min-content]" data-node-id="9:9176">
                          <p className="leading-[normal]">Anti-Slavery</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-[var(--purple-1000,#7100f1)] border-[#f8f6f3] border-solid border-t content-stretch flex flex-col gap-[12px] items-center justify-center pb-[16px] relative shrink-0" data-node-id="9:9177">
                  <div className="h-0 relative shrink-0 w-[1440px]" data-node-id="9:9178" data-name="Divider">
                    <div className="absolute inset-[-1px_0_0_0]">
                      <img alt="" className="block max-w-none size-full" src={imgDivider4} />
                    </div>
                  </div>
                  <div className="content-stretch flex flex-col items-start px-[80px] relative shrink-0 w-[300px]" data-node-id="9:9179" data-name="Consecte">
                    <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-[color:var(--white,white)] whitespace-nowrap" data-node-id="9:9180">
                      <p className="leading-[normal]">© 2025 - Outfox Energy</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute left-[966px] size-[550px] top-[162px]" data-node-id="9:9181">
                <div className="absolute inset-[-0.44%_-8%_-8.45%_-0.44%]">
                  <img alt="" className="block max-w-none size-full" src={imgEllipse6} />
                </div>
              </div>
            </div>
            <div className="-translate-x-1/2 absolute bg-white content-stretch flex flex-col gap-[56px] h-[795px] items-center justify-center left-[calc(50%-3.5px)] top-[1001px] w-[1448px]" data-node-id="9:9182">
              <div className="content-stretch flex flex-col items-center relative shrink-0 w-[1036px]" data-node-id="9:9183">
                <div className="content-stretch flex items-center px-[48px] py-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="9:9184">
                  <p className="[word-break:break-word] font-['Mundial:Bold'] leading-[0] not-italic relative shrink-0 text-[48px] text-[color:var(--text,black)] whitespace-nowrap" data-node-id="9:9185">
                    <span className="leading-[normal]">{`The sooner you `}</span>
                    <span className="leading-[normal] text-[color:var(--purple-1000,#7100f1)]">switch</span>
                    <span className="leading-[normal]">{` the sooner you `}</span>
                    <span className="leading-[normal] text-[color:var(--purple-1000,#7100f1)]">save</span>
                  </p>
                </div>
              </div>
              <div className="[word-break:break-word] content-stretch flex flex-col gap-[48px] items-end leading-[0] not-italic relative shrink-0 w-[1115px]" data-node-id="9:9186">
                <div className="content-stretch flex gap-[32px] items-start relative shrink-0" data-node-id="9:9187">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:9188">
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-0 mt-0 opacity-48 relative row-1 text-[160px] text-[color:var(--purple-200,#e3ccfc)] whitespace-nowrap" data-node-id="9:9189">
                      01
                    </p>
                    <p className="col-1 font-['Mundial:Regular'] leading-[normal] ml-[121px] mt-[210px] relative row-1 text-[24px] text-[color:var(--helping-text,#666)] w-[384px]" data-node-id="9:9190">{`In just a few clicks we'll tell you how much you can save.`}</p>
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-[121px] mt-[90px] relative row-1 text-[48px] text-[color:var(--purple-1000,#7100f1)] w-[199px]" data-node-id="9:9191">
                      Get Your Quote
                    </p>
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:9192">
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-0 mt-0 opacity-48 relative row-1 text-[160px] text-[color:var(--purple-200,#e3ccfc)] whitespace-nowrap" data-node-id="9:9193">
                      02
                    </p>
                    <p className="col-1 font-['Mundial:Regular'] leading-[normal] ml-[129px] mt-[209px] relative row-1 text-[24px] text-[color:var(--helping-text,#666)] w-[384px]" data-node-id="9:9194">
                      Compare our range of tariff and choose what suits you best.
                    </p>
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-[129px] mt-[93px] relative row-1 text-[48px] text-[color:var(--purple-1000,#7100f1)] w-[323px]" data-node-id="9:9195">
                      Choose Your Tariff
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex gap-[32px] items-center relative shrink-0" data-node-id="9:9196">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:9197">
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-0 mt-0 opacity-48 relative row-1 text-[160px] text-[color:var(--purple-200,#e3ccfc)] whitespace-nowrap" data-node-id="9:9198">
                      03
                    </p>
                    <p className="col-1 font-['Mundial:Regular'] leading-[normal] ml-[129px] mt-[209px] relative row-1 text-[24px] text-[color:var(--helping-text,#666)] w-[384px]" data-node-id="9:9199">
                      Your new tariff will start within five working days.
                    </p>
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-[129px] mt-[93px] relative row-1 text-[48px] text-[color:var(--purple-1000,#7100f1)] w-[323px]" data-node-id="9:9200">
                      Start Your Switch
                    </p>
                  </div>
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid place-items-start relative shrink-0" data-node-id="9:9201">
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-0 mt-0 opacity-48 relative row-1 text-[160px] text-[color:var(--purple-200,#e3ccfc)] whitespace-nowrap" data-node-id="9:9202">
                      04
                    </p>
                    <p className="col-1 font-['Mundial:Regular'] leading-[normal] ml-[129px] mt-[209px] relative row-1 text-[24px] text-[color:var(--helping-text,#666)] w-[384px]" data-node-id="9:9203">{`You're now paying less for your energy.`}</p>
                    <p className="col-1 font-['Mundial:Bold'] leading-[normal] ml-[129px] mt-[93px] relative row-1 text-[48px] text-[color:var(--purple-1000,#7100f1)] w-[173px]" data-node-id="9:9204">
                      Start Saving!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bg-[#001e28] content-stretch flex flex-col gap-[56px] h-[676px] items-start justify-center left-[328px] pl-[86px] pr-[90px] py-[32px] top-[1287px] w-[1452px]" data-node-id="9:9205" data-name="Component 28">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[24px] items-start leading-[normal] not-italic relative shrink-0 w-[723px]" data-node-id="9:9206">
              <p className="font-['Mundial:Bold'] relative shrink-0 text-[48px] text-[color:var(--purple-500,#b880f8)] w-[735px]" data-node-id="9:9207">
                The Same Energy - Just Cheaper
              </p>
              <p className="font-['Mundial:Demibold'] min-w-full relative shrink-0 text-[24px] text-[color:var(--white,white)] w-[min-content]" data-node-id="9:9208">{`Why pay more for your energy? Here's why we're the switch you've been waiting for.`}</p>
            </div>
            <div className="content-stretch flex gap-[32px] items-center justify-center relative shrink-0 w-[1255px]" data-node-id="9:9209">
              <div className="bg-[rgba(113,0,241,0.4)] content-stretch flex flex-col gap-[32px] h-[328px] items-start px-[24px] py-[48px] relative rounded-[16px] shrink-0" data-node-id="9:9210">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="9:9211">
                  <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0" data-node-id="9:9212" data-name="Unbetable_prices">
                    <div className="col-1 h-[49.836px] ml-0 mt-[15.16px] relative row-1 w-[65px]" data-node-id="9:9213" data-name="Vector">
                      <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector3} />
                    </div>
                    <div className="col-1 flex h-[17.336px] items-center justify-center ml-[41.17px] mt-[34.67px] relative row-1 w-[26.001px]" data-node-id="9:9214">
                      <div className="flex-none rotate-180">
                        <div className="h-[17.336px] relative w-[26.001px]" data-name="Vector">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgVector4} />
                        </div>
                      </div>
                    </div>
                    <div className="col-1 grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[8.66px] mt-0 place-items-start relative row-1" data-node-id="9:9215" data-name="Clip path group">
                      <div className="col-1 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[-6.498px_-2.168px] mask-size-[45.504px_21.669px] ml-[6.5px] mt-[2.17px] relative row-1 size-[34.673px]" data-node-id="9:9218" style={{ maskImage: `url("${imgGroup6}")` }} data-name="Group">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup7} />
                      </div>
                    </div>
                  </div>
                  <p className="[word-break:break-word] font-['Mundial:Demibold'] leading-[normal] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="9:9221">
                    Unbeatable Prices
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Mundial:Light'] leading-[normal] not-italic relative shrink-0 text-[18px] text-white w-[349px]" data-node-id="9:9222">
                  Always - Why pay more for your energy? Enjoy the best prices with complete transparency and reduce your monthly costs.
                </p>
              </div>
              <div className="bg-[rgba(113,0,241,0.4)] content-stretch flex flex-col gap-[32px] h-[328px] items-start px-[24px] py-[48px] relative rounded-[16px] shrink-0" data-node-id="9:9223">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="9:9224">
                  <div className="h-[65px] relative shrink-0 w-[61.05px]" data-node-id="9:9225">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1000003023} />
                  </div>
                  <p className="[word-break:break-word] font-['Mundial:Demibold'] leading-[normal] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="9:9236">
                    Rated Excellent for Service
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Mundial:Light'] leading-[normal] not-italic relative shrink-0 text-[18px] text-white w-[349px]" data-node-id="9:9237">{`Having the best prices does not mean you have to compromise on the quality of service. We're rated Excellent for a reason.`}</p>
              </div>
              <div className="bg-[rgba(113,0,241,0.4)] content-stretch flex flex-col gap-[32px] h-[328px] items-start px-[24px] py-[48px] relative rounded-[16px] shrink-0" data-node-id="9:9238">
                <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-full" data-node-id="9:9239">
                  <div className="h-[60.789px] relative shrink-0 w-[81.001px]" data-node-id="9:9240">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup1000003028} />
                  </div>
                  <p className="[word-break:break-word] font-['Mundial:Demibold'] leading-[normal] min-w-full not-italic relative shrink-0 text-[24px] text-white w-[min-content]" data-node-id="9:9250">
                    Real People, Real Support
                  </p>
                </div>
                <p className="[word-break:break-word] font-['Mundial:Light'] leading-[normal] not-italic relative shrink-0 text-[18px] text-white w-[349px]" data-node-id="9:9251">
                  Say goodbye to robotic replies. Our UK-based support team is friendly, fast, and always ready to help when you need us most.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute h-[811px] left-0 top-[-3px] w-[1440px] overflow-hidden" data-node-id="9:9362" data-name="Small Fox in a Snowy Christmas Scene-1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgSmallFoxInASnowyChristmasScene11} />
        <HeroLights variant="desktop" />
        <HeroSnow />
      </div>
      <div className="absolute h-[136px] left-[595px] top-[148px] w-[234px]" data-node-id="9:8714" data-name="outfox-energy-primary-logo-2col-rgb 2">
        <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgOutfoxEnergyPrimaryLogo2ColRgb2} />
      </div>
      <p className="[word-break:break-word] absolute font-['Mundial:Demibold'] leading-[normal] left-[75px] not-italic text-[46px] text-[color:var(--black-900,#1a353e)] top-[380px] w-[642px]" data-node-id="9:8727">{`The UK's Cheapest Fixed Tariff`}</p>
      <p className="[word-break:break-word] absolute font-['Mundial:Regular'] leading-[normal] left-[81px] not-italic text-[32px] text-[color:var(--black-900,#1a353e)] top-[456px] whitespace-nowrap" data-node-id="9:8728">
        Pay Less For Your Energy
      </p>
      <div className="absolute content-stretch flex flex-col items-start left-[70px] top-[504px]" data-node-id="9:8729">
        <div className="bg-[var(--white,white)] content-stretch flex flex-col h-[80px] items-end justify-center pl-[32px] pr-[11px] py-[7px] relative rounded-[500px] shrink-0 w-[448px]" data-node-id="9:8730">
          <div className="content-stretch flex gap-[68px] items-center relative shrink-0" data-node-id="9:8731">
            <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[24px] text-[color:var(--helping-text,#666)] whitespace-nowrap" data-node-id="9:8732">
              Your Postcode
            </p>
            <div className="bg-[#7100f1] content-stretch flex items-center justify-center px-[24px] py-[19px] relative rounded-[60px] shrink-0" data-node-id="9:8733">
              <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[24px] text-[color:var(--purple-50,#f5edff)] whitespace-nowrap" data-node-id="9:8734">
                Get A Quote
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute content-stretch flex gap-[16px] items-end left-[84px] top-[600px]" data-node-id="9:8735">
        <div className="[word-break:break-word] flex flex-col font-['Mundial:Regular'] justify-end leading-[0] not-italic relative shrink-0 text-[18px] text-[color:var(--black-900,#1a353e)] whitespace-nowrap" data-node-id="9:8736">
          <p className="leading-[normal]">Excellent 4.3 out of 5</p>
        </div>
        <div className="h-[27.001px] relative shrink-0 w-[108.022px]" data-node-id="9:8737">
          <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgGroup33383} />
        </div>
      </div>
      <div className="-translate-x-1/2 absolute z-30 h-[80px] left-[calc(50%+12px)] top-[44px] w-[1320px]" data-node-id="9:9252" data-name="Component 48">
        <div className="-translate-x-1/2 absolute bg-[var(--purple-1000,#7100f1)] content-stretch drop-shadow-[0px_4px_8px_rgba(113,0,241,0.3)] flex flex-col h-[60px] items-start justify-center left-1/2 px-[31px] py-[17px] rounded-[38.85px] top-0 w-[1320px]" data-node-id="I9:9252;1299:1178">
          <div className="content-stretch flex items-center justify-between relative shrink-0 w-[1253px]" data-node-id="I9:9252;1299:1179">
            <div className="h-[29.241px] relative shrink-0 w-[165px]" data-node-id="I9:9252;1299:1180" data-name="outfox-energy-secondary-logo-2col-rgb 1">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src={imgOutfoxEnergySecondaryLogo2ColRgb2} />
            </div>
            <div className="content-stretch cursor-pointer flex gap-[32px] items-center relative shrink-0" data-node-id="I9:9252;1299:1193">
              <button className="content-stretch flex gap-[10px] items-center justify-center p-[10px] relative shrink-0" data-node-id="I9:9252;1299:1194">
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I9:9252;1299:1195">
                  About Us
                </p>
                <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[13.588px]" data-node-id="I9:9252;1299:1196">
                  <div className="flex-none rotate-90">
                    <div className="h-[13.588px] relative w-[8px]" data-name="arrow_forward_ios">
                      <div className="absolute inset-[2.6%_5.18%_2.6%_4.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgArrowForwardIos} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative shrink-0" data-node-id="I9:9252;1299:1197">
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I9:9252;1299:1198">
                  Account
                </p>
                <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[13.588px]" data-node-id="I9:9252;1299:1199">
                  <div className="flex-none rotate-90">
                    <div className="h-[13.588px] relative w-[8px]" data-name="arrow_forward_ios">
                      <div className="absolute inset-[2.6%_5.18%_2.6%_4.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgArrowForwardIos1} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <button className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative shrink-0" data-node-id="I9:9252;1299:1200">
                <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I9:9252;1299:1201">
                  Tariffs
                </p>
                <div className="flex h-[8px] items-center justify-center relative shrink-0 w-[13.588px]" data-node-id="I9:9252;1299:1202">
                  <div className="flex-none rotate-90">
                    <div className="h-[13.588px] relative w-[8px]" data-name="arrow_forward_ios">
                      <div className="absolute inset-[2.6%_5.18%_2.6%_4.42%]">
                        <img alt="" className="block max-w-none size-full" src={imgArrowForwardIos} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>
              <div className="relative shrink-0" ref={helpMenuRef}>
                <button
                  aria-expanded={helpMenuOpen}
                  aria-haspopup="menu"
                  className="content-stretch flex gap-[8px] items-center justify-center p-[10px] relative shrink-0"
                  data-node-id="I9:9252;1299:1203"
                  onClick={() => setHelpMenuOpen((open) => !open)}
                  type="button"
                >
                  <p className="[word-break:break-word] font-['Mundial:Regular'] leading-[normal] not-italic relative shrink-0 text-[16px] text-left text-white whitespace-nowrap" data-node-id="I9:9252;1299:1204">
                    Help Centre
                  </p>
                  <div
                    className={`flex h-[8px] items-center justify-center relative shrink-0 w-[13.588px] transition-transform ${helpMenuOpen ? "rotate-180" : ""}`}
                    data-node-id="I9:9252;1299:1205"
                  >
                    <div className="flex-none rotate-90">
                      <div className="h-[13.588px] relative w-[8px]" data-name="arrow_forward_ios">
                        <div className="absolute inset-[2.6%_5.18%_2.6%_4.42%]">
                          <img alt="" className="block max-w-none size-full" src={imgArrowForwardIos} />
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
                {helpMenuOpen && (
                  <div className="help-menu" role="menu">
                    <button
                      className="help-menu__item"
                      onClick={() => {
                        setHelpMenuOpen(false);
                        openSupportChat();
                      }}
                      role="menuitem"
                      type="button"
                    >
                      <span className="help-menu__icon" aria-hidden="true">
                        <svg fill="none" viewBox="0 0 24 24">
                          <path
                            d="M7.2 6.8h9.6c1.1 0 2 .9 2 2v5.2c0 1.1-.9 2-2 2h-4.2L9.2 19.2v-3.2H7.2c-1.1 0-2-.9-2-2V8.8c0-1.1.9-2 2-2Z"
                            stroke="currentColor"
                            strokeLinejoin="round"
                            strokeWidth="1.7"
                          />
                        </svg>
                        <span className="mobile-header-chat__dot" />
                      </span>
                      <span>
                        <strong>Chat with us</strong>
                        <small>We’re online and ready to help</small>
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="content-stretch flex items-center relative shrink-0" data-node-id="I9:9252;1299:1206">
              <div className="content-stretch flex gap-[14px] items-center relative shrink-0" data-node-id="I9:9252;1299:1207">
                <div className="border border-solid border-white content-stretch flex h-[38px] items-center justify-center px-[18px] py-[15px] relative rounded-[23px] shrink-0 w-[109px]" data-node-id="I9:9252;1299:1208">
                  <p className="[word-break:break-word] font-['Mundial:Demibold'] leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-nowrap" data-node-id="I9:9252;1299:1209">
                    Quote Me
                  </p>
                </div>
                <div className="content-stretch flex h-[38px] items-center relative shrink-0 w-[109px]" data-node-id="I9:9252;1299:1210">
                  <div className="bg-white content-stretch flex h-[38px] items-center justify-center px-[18px] py-[15px] relative rounded-[23px] shrink-0 w-[109px]" data-node-id="I9:9252;1299:1211">
                    <p className="[word-break:break-word] font-['Mundial:Demibold'] leading-[normal] not-italic relative shrink-0 text-[16px] text-[color:var(--black-1000,#001e28)] whitespace-nowrap" data-node-id="I9:9252;1299:1212">
                      Sign In
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
