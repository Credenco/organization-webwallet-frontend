import React from 'react';
import { IconProps } from './icons/IconProps';

export interface Props {
    className?: string | undefined;
}

export const Logo: React.FC<IconProps> = ({width = '138', height = "32", className}: IconProps) => {
    return (<svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 138 32" fill="none" className={className}>
            <mask id="mask0_541_8723" maskUnits="userSpaceOnUse" x="0" y="0" width="138" height="32">
                <path d="M138 0H0V32H138V0Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_541_8723)">
                <path d="M138 0H0V32H138V0Z" fill="white"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1.38672 4.39294C1.38672 2.78015 2.68877 1.47266 4.29484 1.47266C5.90092 1.47266 7.20297 2.78015 7.20297 4.39294C7.20297 6.00574 5.90092 7.31325 4.29484 7.31325C2.68877 7.31325 1.38672 6.00574 1.38672 4.39294Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.209 4.39294C14.209 2.78015 15.511 1.47266 17.1171 1.47266C18.7232 1.47266 20.0252 2.78015 20.0252 4.39294C20.0252 6.00574 18.7232 7.31325 17.1171 7.31325C15.511 7.31325 14.209 6.00574 14.209 4.39294Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M26.8984 4.39294C26.8984 2.78015 28.2301 1.47266 29.8727 1.47266C31.5152 1.47266 32.8469 2.78015 32.8469 4.39294C32.8469 6.00574 31.5152 7.31325 29.8727 7.31325C28.2301 7.31325 26.8984 6.00574 26.8984 4.39294Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1.38672 15.8085C1.38672 14.1957 2.68877 12.8882 4.29484 12.8882C5.90092 12.8882 7.20297 14.1957 7.20297 15.8085C7.20297 17.4213 5.90092 18.7288 4.29484 18.7288C2.68877 18.7288 1.38672 17.4213 1.38672 15.8085Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.209 15.8085C14.209 14.1957 15.511 12.8882 17.1171 12.8882C18.7232 12.8882 20.0252 14.1957 20.0252 15.8085C20.0252 17.4213 18.7232 18.7288 17.1171 18.7288C15.511 18.7288 14.209 17.4213 14.209 15.8085Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M26.8984 15.8085C26.8984 14.1957 28.2301 12.8882 29.8727 12.8882C31.5152 12.8882 32.8469 14.1957 32.8469 15.8085C32.8469 17.4213 31.5152 18.7288 29.8727 18.7288C28.2301 18.7288 26.8984 17.4213 26.8984 15.8085Z"
                      stroke="#1C1C1C" strokeWidth="1.33"></path>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1.38672 27.2909C1.38672 25.6414 2.68877 24.3042 4.29484 24.3042C5.90092 24.3042 7.20297 25.6414 7.20297 27.2909C7.20297 28.9403 5.90092 30.2775 4.29484 30.2775C2.68877 30.2775 1.38672 28.9403 1.38672 27.2909Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M14.209 27.2909C14.209 25.6414 15.511 24.3042 17.1171 24.3042C18.7232 24.3042 20.0252 25.6414 20.0252 27.2909C20.0252 28.9403 18.7232 30.2775 17.1171 30.2775C15.511 30.2775 14.209 28.9403 14.209 27.2909Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M26.8984 27.2909C26.8984 25.6414 28.2301 24.3042 29.8727 24.3042C31.5152 24.3042 32.8469 25.6414 32.8469 27.2909C32.8469 28.9403 31.5152 30.2775 29.8727 30.2775C28.2301 30.2775 26.8984 28.9403 26.8984 27.2909Z"
                      stroke="#1C1C1C" strokeWidth="1.33"/>
                <path d="M26.9747 27.2241L20.0254 27.2242" stroke="#1C1C1C" strokeWidth="1.33"/>
                <path d="M15.0703 25.2132L6.41016 17.9326" stroke="#1C1C1C" strokeWidth="1.33"/>
                <path d="M6.41016 13.7972L15.0703 6.5166" stroke="#1C1C1C" strokeWidth="1.33"/>
                <path d="M20.0254 4.39307H26.9748" stroke="#1C1C1C" strokeWidth="1.33"/>
                <path
                    d="M45.3867 13.5869C45.125 14.3009 44.9941 15.0293 44.9941 15.772C44.9941 16.5375 45.1364 17.2944 45.4208 18.0428C45.7053 18.7911 46.1035 19.4652 46.6155 20.065C47.1275 20.6649 47.7362 21.1447 48.4416 21.5046C49.147 21.8645 49.9264 22.0445 50.7797 22.0445C51.4169 22.0445 52.0626 21.936 52.7168 21.7189C53.371 21.5018 53.9627 21.1819 54.4917 20.7591C55.0208 20.3364 55.4105 19.8223 55.6608 19.2167L54.0736 18.3084C53.8688 18.7883 53.5872 19.1739 53.2288 19.4652C52.8704 19.7566 52.4807 19.9708 52.0597 20.1079C51.6388 20.245 51.2349 20.3135 50.848 20.3135C50.2791 20.3135 49.7557 20.1936 49.2779 19.9536C48.8 19.7137 48.3876 19.3852 48.0405 18.9682C47.6935 18.5512 47.4233 18.0713 47.2299 17.5286C47.0365 16.9859 46.9397 16.4232 46.9397 15.8405C46.9397 15.3149 47.0222 14.7894 47.1872 14.2638C47.3522 13.7382 47.5968 13.2641 47.9211 12.8413C48.2453 12.4186 48.6464 12.0787 49.1243 11.8216C49.6021 11.5646 50.1597 11.436 50.7968 11.436C51.1837 11.436 51.579 11.4932 51.9829 11.6074C52.3869 11.7217 52.7623 11.9216 53.1093 12.2072C53.4564 12.4929 53.7437 12.8813 53.9712 13.3726L55.4731 12.3615C55.0862 11.5846 54.4946 10.9476 53.6981 10.4506C52.9017 9.95358 51.9573 9.70508 50.8651 9.70508C49.9435 9.70508 49.1186 9.87932 48.3904 10.2278C47.6622 10.5763 47.045 11.0447 46.5387 11.6331C46.0324 12.2215 45.6484 12.8728 45.3867 13.5869ZM113.841 15.772C113.841 15.0293 113.972 14.3009 114.234 13.5869C114.495 12.8728 114.879 12.2215 115.386 11.6331C115.892 11.0447 116.509 10.5763 117.237 10.2278C117.966 9.87932 118.79 9.70508 119.712 9.70508C120.804 9.70508 121.749 9.95358 122.545 10.4506C123.342 10.9476 123.933 11.5846 124.32 12.3615L122.818 13.3726C122.591 12.8813 122.303 12.4929 121.956 12.2072C121.609 11.9216 121.234 11.7217 120.83 11.6074C120.426 11.4932 120.031 11.436 119.644 11.436C119.007 11.436 118.449 11.5646 117.971 11.8216C117.493 12.0787 117.092 12.4186 116.768 12.8413C116.444 13.2641 116.199 13.7382 116.034 14.2638C115.869 14.7894 115.787 15.3149 115.787 15.8405C115.787 16.4232 115.883 16.9859 116.077 17.5286C116.27 18.0713 116.54 18.5512 116.887 18.9682C117.235 19.3852 117.647 19.7137 118.125 19.9536C118.603 20.1936 119.126 20.3135 119.695 20.3135C120.082 20.3135 120.486 20.245 120.907 20.1079C121.328 19.9708 121.717 19.7566 122.076 19.4652C122.434 19.1739 122.716 18.7883 122.921 18.3084L124.508 19.2167C124.257 19.8223 123.868 20.3364 123.339 20.7591C122.81 21.1819 122.218 21.5018 121.564 21.7189C120.91 21.936 120.264 22.0445 119.627 22.0445C118.773 22.0445 117.994 21.8645 117.289 21.5046C116.583 21.1447 115.974 20.6649 115.462 20.065C114.95 19.4652 114.552 18.7911 114.268 18.0428C113.983 17.2944 113.841 16.5375 113.841 15.772ZM128.945 21.5304C129.651 21.8731 130.441 22.0445 131.317 22.0445C132.148 22.0445 132.919 21.8788 133.63 21.5475C134.341 21.2162 134.958 20.762 135.482 20.185C136.005 19.608 136.412 18.9511 136.702 18.2141C136.992 17.4772 137.137 16.7031 137.137 15.8919C137.137 15.1264 136.998 14.3781 136.719 13.6468C136.44 12.9156 136.048 12.2529 135.541 11.6588C135.035 11.0647 134.426 10.5905 133.715 10.2364C133.004 9.88217 132.216 9.70508 131.351 9.70508C130.521 9.70508 129.75 9.8736 129.039 10.2107C128.328 10.5477 127.711 11.0047 127.187 11.5817C126.664 12.1587 126.254 12.8156 125.958 13.5526C125.663 14.2895 125.515 15.0636 125.515 15.8748C125.515 16.6517 125.654 17.4086 125.933 18.1456C126.212 18.8825 126.607 19.5452 127.119 20.1336C127.631 20.722 128.24 21.1876 128.945 21.5304ZM57.4357 9.79077V21.9588H59.3472V17.7257H62.1632L64.7915 21.9588H66.9419L64.0917 17.3315C64.5696 17.1716 64.9877 16.9145 65.3461 16.5603C65.7045 16.2061 65.9805 15.7834 66.1739 15.2921C66.3673 14.8008 66.464 14.2867 66.464 13.7497C66.464 13.2584 66.3701 12.7785 66.1824 12.3101C65.9947 11.8416 65.733 11.4189 65.3973 11.0418C65.0617 10.6648 64.6663 10.362 64.2112 10.1335C63.7561 9.90502 63.2555 9.79077 62.7093 9.79077H57.4357ZM77.0283 20.2621V21.9588H68.7168V9.79077H76.8747V11.4874H70.6283V14.9493H76.0384V16.5432H70.6283V20.2621H77.0283ZM79.008 9.79077V21.9588H83.3088C84.5035 21.9588 85.5445 21.7075 86.432 21.2047C87.3195 20.702 88.005 19.9936 88.4885 19.0796C88.9721 18.1656 89.2139 17.0916 89.2139 15.8576C89.2139 14.738 88.9949 13.7182 88.5568 12.7985C88.1188 11.8788 87.4617 11.1475 86.5856 10.6048C85.7095 10.0621 84.6173 9.79077 83.3088 9.79077H79.008ZM99.5392 20.2621V21.9588H91.2277V9.79077H99.3856V11.4874H93.1392V14.9493H98.5493V16.5432H93.1392V20.2621H99.5392ZM103.43 21.9588V13.3555L110.206 21.9588H111.878V9.80791H109.95V18.5826L103.089 9.79077H101.519V21.9588H103.43ZM127.733 17.5372C127.551 17.0002 127.46 16.4461 127.46 15.8748C127.46 15.3264 127.548 14.7894 127.725 14.2638C127.901 13.7382 128.154 13.2641 128.484 12.8413C128.814 12.4186 129.218 12.0816 129.696 11.8302C130.174 11.5788 130.72 11.4532 131.334 11.4532C131.915 11.4532 132.441 11.5731 132.913 11.8131C133.385 12.053 133.792 12.3815 134.133 12.7985C134.475 13.2155 134.734 13.6897 134.91 14.221C135.086 14.7522 135.174 15.3035 135.174 15.8748C135.174 16.4118 135.089 16.9459 134.918 17.4772C134.748 18.0085 134.5 18.4883 134.176 18.9168C133.852 19.3452 133.451 19.6852 132.973 19.9365C132.495 20.1879 131.949 20.3135 131.334 20.3135C130.743 20.3135 130.208 20.1936 129.73 19.9536C129.252 19.7137 128.846 19.3852 128.51 18.9682C128.174 18.5512 127.915 18.0742 127.733 17.5372ZM62.6923 16.029H59.3472V11.4874H62.5899C62.9312 11.4874 63.2469 11.5903 63.5371 11.7959C63.8272 12.0016 64.0633 12.2729 64.2453 12.61C64.4274 12.947 64.5184 13.3269 64.5184 13.7497C64.5184 14.161 64.4388 14.5409 64.2795 14.8893C64.1202 15.2378 63.904 15.5149 63.6309 15.7205C63.3579 15.9262 63.045 16.029 62.6923 16.029ZM86.7989 13.5869C87.1118 14.2438 87.2683 15.0007 87.2683 15.8576C87.2683 16.6917 87.1147 17.4401 86.8075 18.1027C86.5003 18.7654 86.0537 19.291 85.4677 19.6794C84.8818 20.0679 84.1621 20.2621 83.3088 20.2621H80.9195V11.4874H83.3088C84.1508 11.4874 84.8647 11.6731 85.4507 12.0444C86.0366 12.4158 86.486 12.9299 86.7989 13.5869Z"
                    fill="#1C1C1C"/>
            </g>
        </svg>
    )
};
