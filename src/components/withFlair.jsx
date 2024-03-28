// withFlair.js
import React, { useState, useEffect } from "react";

const withFlair = (WrappedComponent) => {
    return ({ triggerFlair, ...props }) => {
        const [flair, setFlair] = useState(false);

        useEffect(() => {
            if (triggerFlair) {
                setFlair(true);
                setTimeout(() => setFlair(false), 500); // Duration of the flair
            }
        }, [triggerFlair]);

        return <WrappedComponent {...props} flair={flair} />;
    };
};

export default withFlair;
