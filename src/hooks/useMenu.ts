import { MouseEvent, useCallback, useMemo, useState } from 'react';

export default function useMenu() {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const open = useMemo(() => Boolean(anchorEl), [anchorEl]);

    const handleOpen = useCallback((e: MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
    }, [])

    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, []);

    return {
        open,
        anchorEl,
        handleOpen,
        handleClose
    }
}