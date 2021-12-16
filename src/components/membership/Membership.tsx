import React from 'react';
import t from '../../locale/locale';
import FromInput from './FormInput';

function Membership() {
  return (
    <div>
      <h2>크로스핏 {t('boxName')} 회원 가입 신청서</h2>
      <form>
        <div>
          <FromInput labelText="성명" inputType="number" />
          <FromInput labelText="성별" inputType={['radio', 'radio']} />
        </div>
        <div>
          <FromInput labelText="생년월일" inputType="date" />
          <FromInput labelText="연락처" inputType="text" />
        </div>
        <div>
          <FromInput labelText="회원권종류" inputType="text" />
          <FromInput labelText="가격" inputType="text" />
        </div>
        <div>
          <FromInput labelText="할인 이벤트" inputType="combo" />
          <FromInput labelText="기간" inputType="text" />
        </div>
        <div>
          <FromInput labelText="사물함" inputType="text" />
          <div>
            <FromInput labelText="가격" inputType="text" />
            <FromInput labelText="기간" inputType="text" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default Membership;
