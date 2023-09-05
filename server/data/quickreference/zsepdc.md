# ZSE PDC commands

## Portland (KPDX)

| Departure  | To UNICOM  | To departure frequency |
| ---------- | ---------- | ---------------------- |
| CASCD      | .PDCCASCDU | .PDCCASCD 3A           |
| HRMNS      | .PDCHRMNSU | .PDCHRMNS 3A           |
| LAVAA      | .PDCLAVAAU | .PDCLAVAA 3A           |
| MINNE      | .PDCMINNEU | .PDCMINNE 3A           |
| PTLD2 (6k) | .PDCPTLDJU | .PDCPTLDJ 3A           |
| PTLD2 (3k) | .PDCPTLDTU | .PDCPTLDT 3A           |
| WHAMY      | .PDCWHAMYU | .PDCWHAMY 3A           |

Replace `3A` with the appropriate position code if necessary.

## Seattle (KSEA)

| Departure          | To UNICOM   | To departure frequency | To departure frequency (with ramp control) |
| ------------------ | ----------- | ---------------------- | ------------------------------------------ |
| BANGR              | .PDCBANGRU  | .PDCBANGR 1W           | .PDCBANGRR 1W 2R                           |
| ELMAA              | .PDCELMAAU  | .PDCELMAA 1W           | .PDCELMAAR 1W 2R                           |
| HAROB              | .PDCHAROBU  | .PDCHAROB 1W           | .PDCHAROBR 1W 2R                           |
| ISBRG              | .PDCISBRGU  | .PDCISBRG 1W           | .PDCISBRGR 1W 2R                           |
| JEFPO              | .PDCJEFPOU  | .PDCJEFPO 1W           | .PDCJEFPOR 1W 2R                           |
| MONTN              | .PDCMONTNU  | .PDCMONTN 1W           | .PDCMONTNR 1W 2R                           |
| OZWLD              | .PDCOZWLDU  | .PDCOZWLD 1W           | .PDCOZWLDR 1W 2R                           |
| SEA                | .PDCSEAU    | .PDCSEA 1W             | .PDCSEAR 1W 2R                             |
| SUMMA (North flow) | .PDCSUMMANU | .PDCSUMMAN 1W          | .PDCSUMMANR 1W 2R                          |
| SUMMA (South flow) | .PDCSUMMASU | .PDCSUMMAS 1W          | .PDCSUMMASR 1W 2R                          |

Replace `1W` with the appropriate position code if necessary.

## Departure frequencies

| Position code | Name                       | Frequency |
| ------------- | -------------------------- | --------- |
| 3A            | Portland Combined Approach | 124.350   |
| 1W            | Seattle Combined Approach  | 125.600   |
| S16           | Seattle Center             | 135.450   |
