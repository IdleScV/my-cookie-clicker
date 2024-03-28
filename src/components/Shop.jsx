import React, { useState } from "react";
import { Flex, Card, Button, Box } from "rebass";
import { useSpring, animated } from "react-spring";
import Item from "./Item";
import { FaShoppingCart, FaShoppingBasket } from "react-icons/fa";

const Shop = ({
    items,
    itemQuantities,
    purchaseItem,
    cookies,
    cookiesPerSecond,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const buttonAnimation = useSpring({
        to: { opacity: 1, transform: "scale(1)" },
        from: { transform: "scale(0.95)" },
    });
    const drawerAnimation = useSpring({
        config: { tension: 250, friction: 26 },
        opacity: isOpen ? 1 : 0,
    });

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            mt={2}
            fontFamily="Silkscreen"
        >
            <Button
                onClick={() => setIsOpen(!isOpen)}
                sx={{
                    cursor: "pointer",
                    marginBottom: "8px",
                    backgroundColor: isOpen ? "#dc3545" : "#007BFF",
                    color: "white",
                    "&:hover": {
                        backgroundColor: isOpen ? "#c82333" : "#0056b3",
                    },
                    borderRadius: "4px",
                    padding: "8px 16px",
                }}
            >
                {isOpen ? "Close Shop" : "Open Shop"}
            </Button>
            <Box
                sx={{
                    maxWidth: "420px",
                    width: "100%",
                    alignContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    py: 1,
                    maxHeight: "100%",
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                {isOpen && (
                    <Box
                        style={drawerAnimation}
                        sx={{
                            minWidth: "100%",
                            maxHeight: "300px",
                            overflowY: "scroll",
                            p: 2,

                            borderRadius: "8px",
                            boxShadow: "0 0 8px rgba(0, 0, 0, 0.125)",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        {Object.values(items)
                            .filter(
                                (item) => cookiesPerSecond >= item.requiredCps
                            )
                            .map((item) => (
                                <Card
                                    key={item.id}
                                    my={1}
                                    p={2}
                                    sx={{
                                        borderRadius: "8px",
                                        boxShadow:
                                            "0 0 8px rgba(0, 0, 0, 0.125)",
                                        width: "100%",
                                    }}
                                >
                                    <Flex
                                        justifyContent="space-between"
                                        alignItems="center"
                                    >
                                        <Item
                                            item={item}
                                            quantity={itemQuantities[item.id]}
                                        />
                                        <Button
                                            disabled={cookies < item.cost}
                                            onClick={() => purchaseItem(item)}
                                            sx={{
                                                cursor: "pointer",
                                                backgroundColor:
                                                    cookies < item.cost
                                                        ? "#dc3545"
                                                        : "#007BFF",
                                                color: "white",
                                                "&:hover": {
                                                    backgroundColor:
                                                        cookies < item.cost
                                                            ? "#dc3545"
                                                            : "#0056b3",
                                                },
                                                padding: "8px 16px",
                                                borderRadius: "4px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <animated.span
                                                style={buttonAnimation}
                                            >
                                                {cookies < item.cost ? (
                                                    <FaShoppingBasket
                                                        size={25}
                                                    />
                                                ) : (
                                                    <FaShoppingCart size={25} />
                                                )}
                                            </animated.span>
                                        </Button>
                                    </Flex>
                                </Card>
                            ))}
                    </Box>
                )}
            </Box>
        </Flex>
    );
};

export default Shop;
