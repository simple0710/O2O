package com.one.o2o.dto.common;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@AllArgsConstructor
@Getter @Setter
@Data
@Builder
public class PageInfoDto {
    @JsonProperty("cur_pg")
    private Integer curPg;

    @JsonProperty("total_pg")
    private Integer totalPg;

    @JsonProperty("total_reqs")
    private Long totalReqs;
}
