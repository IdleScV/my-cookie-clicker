import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import { Box, Text } from "rebass";
import formatNumber from "../utility/formatNumber";

const Item = ({ item, quantity }) => {
    const [isHovering, setIsHovering] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
    const itemRef = useRef(null); // Ref for the item element
    const totalCps = item.cookiesPerSecond * (quantity || 0);

    const updateTooltipPosition = () => {
        if (itemRef.current) {
            const rect = itemRef.current.getBoundingClientRect();
            setTooltipPosition({
                top: rect.top + window.scrollY + rect.height, // Position below the element
                left: rect.left + window.scrollX + rect.width / 2, // Centered horizontally
            });
        }
    };

    useEffect(() => {
        if (isHovering) {
            updateTooltipPosition();
            window.addEventListener("resize", updateTooltipPosition);
            window.addEventListener("scroll", updateTooltipPosition);
        }

        return () => {
            window.removeEventListener("resize", updateTooltipPosition);
            window.removeEventListener("scroll", updateTooltipPosition);
        };
    }, [isHovering]);

    return (
        <Box
            ref={itemRef}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            sx={{
                cursor: "pointer",
                fontSize: 4,
                fontFamily: "Silkscreen, Arial, sans-serif",
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                mr: 4,
            }}
        >
            <Text textAlign={"left"}>{item.name}</Text>
            <Text as="span" fontSize={4}>
                x {quantity || 0}
            </Text>
            {isHovering &&
                ReactDOM.createPortal(
                    <Box
                        sx={{
                            position: "absolute",
                            top: `${tooltipPosition.top}px`,
                            left: `${tooltipPosition.left}px`,
                            transform: "translateX(-50%)",
                            mt: 2,
                            bg: "background",
                            p: 2,
                            border: "1px solid",
                            borderColor: "muted",
                            borderRadius: "4px",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                            whiteSpace: "nowrap",
                            fontSize: 4,
                            fontFamily: "Silkscreen, Arial, sans-serif",
                        }}
                    >
                        <Text>
                            Total CPS from this item: {formatNumber(totalCps)}
                        </Text>
                        <Text>Cookies per second: {item.cookiesPerSecond}</Text>
                        <Text>Cost: {formatNumber(item.cost)} cookies</Text>
                    </Box>,
                    document.body
                )}
        </Box>
    );
};

export default Item;
