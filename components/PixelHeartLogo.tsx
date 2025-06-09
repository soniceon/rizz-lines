import React from 'react';

const PixelHeartLogo: React.FC = () => (
  <div className="logo-card">
    <div className="logo-title">5. 像素艺术风格</div>
    <div className="logo-container">
      <svg width="120" height="120" viewBox="0 0 120 120">
        <defs>
          <pattern id="pixel1" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <rect width="8" height="8" fill="#ff6b9d"/>
            <rect width="6" height="6" x="1" y="1" fill="#ff8fab"/>
          </pattern>
        </defs>
        {/* 像素爱心 */}
        {/* 第一行 */}
        <rect x="32" y="32" width="8" height="8" fill="#ff6b9d"/>
        <rect x="40" y="32" width="8" height="8" fill="#ff6b9d"/>
        <rect x="56" y="32" width="8" height="8" fill="#ff6b9d"/>
        <rect x="64" y="32" width="8" height="8" fill="#ff6b9d"/>
        {/* 第二行 */}
        <rect x="24" y="40" width="8" height="8" fill="#ff6b9d"/>
        <rect x="32" y="40" width="8" height="8" fill="#ffb3c6"/>
        <rect x="40" y="40" width="8" height="8" fill="#ffb3c6"/>
        <rect x="48" y="40" width="8" height="8" fill="#ff6b9d"/>
        <rect x="56" y="40" width="8" height="8" fill="#ffb3c6"/>
        <rect x="64" y="40" width="8" height="8" fill="#ffb3c6"/>
        <rect x="72" y="40" width="8" height="8" fill="#ff6b9d"/>
        {/* 第三行 */}
        <rect x="24" y="48" width="8" height="8" fill="#ff6b9d"/>
        <rect x="32" y="48" width="8" height="8" fill="#ffb3c6"/>
        <rect x="40" y="48" width="8" height="8" fill="#fff"/>
        <rect x="48" y="48" width="8" height="8" fill="#ffb3c6"/>
        <rect x="56" y="48" width="8" height="8" fill="#fff"/>
        <rect x="64" y="48" width="8" height="8" fill="#ffb3c6"/>
        <rect x="72" y="48" width="8" height="8" fill="#ff6b9d"/>
        {/* 第四行 */}
        <rect x="32" y="56" width="8" height="8" fill="#ff6b9d"/>
        <rect x="40" y="56" width="8" height="8" fill="#ffb3c6"/>
        <rect x="48" y="56" width="8" height="8" fill="#ffb3c6"/>
        <rect x="56" y="56" width="8" height="8" fill="#ffb3c6"/>
        <rect x="64" y="56" width="8" height="8" fill="#ff6b9d"/>
        {/* 第五行 */}
        <rect x="40" y="64" width="8" height="8" fill="#ff6b9d"/>
        <rect x="48" y="64" width="8" height="8" fill="#ffb3c6"/>
        <rect x="56" y="64" width="8" height="8" fill="#ff6b9d"/>
        {/* 第六行 */}
        <rect x="48" y="72" width="8" height="8" fill="#ff6b9d">
          <animate attributeName="fill" values="#ff6b9d;#4ecdc4;#ff6b9d" dur="2s" repeatCount="indefinite"/>
        </rect>
        {/* 像素装饰 */}
        <rect x="16" y="24" width="4" height="4" fill="#ffd93d">
          <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite"/>
        </rect>
        <rect x="84" y="28" width="4" height="4" fill="#4ecdc4">
          <animate attributeName="opacity" values="0;1;0" dur="1.2s" repeatCount="indefinite"/>
        </rect>
      </svg>
    </div>
    <div className="description">复古8位游戏风格，经典像素艺术设计，唤起怀旧情怀和游戏文化记忆</div>
  </div>
);

export default PixelHeartLogo; 