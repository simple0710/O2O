import sys
import cv2
import numpy as np

# 큰 이미지와 템플릿 이미지 불러오기
# large_image = cv2.imread('data/images/myEmpCard.jpg')
# template_image = cv2.imread('data/images/myPic.jpg')


# 이름을 넣는다.
def matching(large_image, template_image):
    large_image = cv2.imread(large_image)
    template_image = cv2.imread(template_image)

    if large_image is None or template_image is None:
        raise ValueError("can't find")

    # 템플릿 매칭 실행
    result = cv2.matchTemplate(large_image, template_image, cv2.TM_CCOEFF_NORMED)

    # 매칭 결과 중 최대값의 위치를 찾기
    min_val, max_val, min_loc, max_loc = cv2.minMaxLoc(result)

    # 임계값 설정 - 템플릿이 얼마나 일치해야 하는지 결정
    threshold = 0.7

    # if max_val >= threshold:
    #     print("템플릿 이미지가 큰 이미지에 포함되어 있습니다.")
    #     # 매칭 위치의 좌표 (max_loc)를 사용해 필요한 후속 작업을 할 수 있습니다.
    #     top_left = max_loc
    #     h, w = template_image.shape[:2]
    #     bottom_right = (top_left[0] + w, top_left[1] + h)
    #     cv2.rectangle(large_image, top_left, bottom_right, (0, 255, 0), 2)
    #     cv2.imshow("Detected Area", large_image)
    #     cv2.waitKey(0)
    #     cv2.destroyAllWindows()
    # else:
    #     print(f"템플릿 이미지가 큰 이미지에 포함되어 있지 않습니다. 추정치={max_val:f}")
    return max_val


if __name__ == "__main__":
    ans = matching(sys.argv[1], sys.argv[2])
    print(ans)