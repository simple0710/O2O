package com.one.o2o.dto.productsrequest;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter @Setter
@Data
public class PageInfoDto {
    @JsonProperty("cur_pg")
    private Integer curPg;

    @JsonProperty("total_pg")
    private Integer totalPg;

    @JsonProperty("total_reqs")
    private Long totalReqs;
}
