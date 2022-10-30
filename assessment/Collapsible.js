import React from 'react';
import Collapsible from 'react-collapsible';
import './Collapsible.css'

const AppColap = () => {
  return (
    <Collapsible trigger="Start here">
      <p>
        This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
      <input class="text-box" type="text" id="textInput" />
      <input type="button" name="answer" value="Show Text Field" />
    </Collapsible>
  );
};

export default AppColap;