import React from 'react';
export default function Welcome(props:any) {

      if (props.id > -1) {
        const m = props.service.getMemberDetails(props.id);
        return (
            <div>
              <p>Thanks for signing up for the Frequent Flyer Club!</p>
              <p>Your Member Id is : <span data-testid={'id'}>{props.id}</span></p>
              <p>Your status is: <span data-testid={'status'}>{m.status}</span></p>
            </div>
        );
      } else {
        return <div></div>
      }
}
